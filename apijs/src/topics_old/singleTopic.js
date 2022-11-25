const { prisma } = require("../prisma");
const { ERRORS } = require("./errors");
const getSingleTopic = async (id) => {
  const topic = await prisma.topics.findUnique({ where: { id: id } });
  if (topic === null) {
    return new Error(ERRORS.TOPIC_NOT_FOUND);
  }
  return topic;
};
module.exports = { getSingleTopic };
