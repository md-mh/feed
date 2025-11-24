const { db } = require("../utils/setting");

const pagination = async ({ table, page = 1, limit = 12, filters }) => {
  let total = 0;
  // Build dynamic WHERE clause for multiple filter fields
  const filterKeys = Object.keys(filters);
  let whereClause = "";
  let countValues = [];

  // Enhanced filter handling: supports LIKE, =, IN
  if (filterKeys.length > 0) {
    whereClause =
      "WHERE " +
      filterKeys
        .map((key) => {
          const value = filters[key];
          if (Array.isArray(value)) {
            countValues.push(...value);
            return `${key} IN (${value.map(() => "?").join(", ")})`;
          } else if (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty("op") &&
            value.hasOwnProperty("val")
          ) {
            if (value.op.toUpperCase() === "IN" && Array.isArray(value.val)) {
              countValues.push(...value.val);
              return `${key} IN (${value.val.map(() => "?").join(", ")})`;
            } else if (value.op.toUpperCase() === "LIKE") {
              countValues.push(`%${value.val}%`);
              return `${key} LIKE ?`;
            } else {
              countValues.push(value.val);
              return `${key} ${value.op} ?`;
            }
          } else {
            if (typeof value === "string") {
              countValues.push(`%${value}%`);
              return `${key} LIKE ?`;
            } else {
              countValues.push(value);
              return `${key} = ?`;
            }
          }
        })
        .join(" AND ");
  }

  const sql = `SELECT COUNT(*) as total FROM ${table} ${whereClause}`;
  const value = countValues;
  await new Promise((resolve, reject) => {
    db.get(sql, value, (err, row) => {
      if (err) {
        total = 0;
        reject(err);
      } else {
        total = row?.total || 0;
        resolve();
      }
    });
  });
  return {
    total,
    page,
    limit,
  };
};

module.exports = { pagination };
