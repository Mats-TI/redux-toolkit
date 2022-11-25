const { prisma } = require("../prisma");
const { ERRORS } = require("./errors");
const paginatedTopic = async ({ take, cursor }) => {
  if (take === undefined) {
    throw new Error("Expected take to be not undefined");
  }
  const topics = await prisma.topics.findMany({
    cursor,
    skip: cursor ? 1 : 0,
    take,
    orderBy: { createdAt: "desc" },
  });
  if (topics.length === 0) {
    return new Error(ERRORS.NOT_FOUND);
  }
  return topics;
};
module.exports = { paginatedTopic };
