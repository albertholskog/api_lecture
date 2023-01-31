const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultriple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM projects LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create({
  title,
  github_link,
  live_link,
  description,
  image_url,
  achievements,
}) {
  const result = await db.query(
    `INSERT INTO projects (title,github_link, live_link, description, image_url, achievements) VALUES (${title},${github_link},${live_link},${description},${image_url},${achievements})`
  );
  let massage = "error in creating project";

  if (result.affectedRows) {
    massage = "created project successfully";
  }
  return massage;
}

module.exports = {
  getMultriple,
  create,
};
