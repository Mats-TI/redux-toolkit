const express = require("express");
const { z } = require("zod");
const { prisma } = require("../prisma");
const { nanoid } = require("nanoid");
const { getSingleTopic } = require("./singleTopic");
const { ERRORS } = require("./errors");
const { paginatedTopic } = require("./paginatedQuery");
const router = express.Router();

router.get("/topics", async (req, res) => {
  try {
    const query = req.query;
    const id = query.id;
    if (typeof id === "string") {
      const topic = await getSingleTopic(id);
      if (topic instanceof Error) {
        const msg = topic.message;
        if (msg === ERRORS.NOT_FOUND) {
          return res.status(404).send(`Unable to find any topic with id ${id}`);
        }
        throw topic;
      }
      return res.json(whiteLabelTopic(topic));
    }
    const take = query.take || 20;
    const cursor = query.cursor;
    const topics = await paginatedTopic({ cursor, take });
    if (topics instanceof Error) {
      const msg = topics.message;
      if (msg === ERRORS.NOT_FOUND) {
        return res
          .status(404)
          .send(
            `Unable to find any more topics with query take : ${take} and cursor : ${cursor}`
          );
      }
      throw topics;
    }
    const whitelabeledTopics = topics.map(whiteLabelTopic);
    return res.json(whitelabeledTopics);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

const CreateTopicBodySchema = z.object({
  title: z.string(),
  description: z.string(),
});

router.post("/topics", async (req, res) => {
  try {
    const parsedBody = CreateTopicBodySchema.safeParse(req.body);
    if (parsedBody.error) {
      return res.status(400).send("Unable to create item. Data is incomplete");
    }
    const dataForTopicCreation = parsedBody.data;
    const topicCreated = await prisma.topics.create({
      data: {
        description: dataForTopicCreation.description,
        title: dataForTopicCreation.title,
        published: "",
        id: nanoid(),
      },
    });
    const whiteLabeledTopicCreated = whiteLabelTopic(topicCreated);
    return res.json(whiteLabeledTopicCreated);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

const DeleteTopicBodySchema = z.object({ id: z.string() });
router.delete("/topics", async (req, res) => {
  try {
    const parsedBody = DeleteTopicBodySchema.safeParse(req.body);
    if (parsedBody.error) {
      return res.status(400).send("Unable to delete item. Data is incomplete");
    }
    const dataForTopicDeletion = parsedBody.data;
    const topicDeleted = await prisma.topics.delete({
      where: { id: dataForTopicDeletion.id },
    });
    const whiteLabledTopicDeleted = whiteLabelTopic(topicDeleted);
    return res.json(whiteLabledTopicDeleted);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

const UpdatedTopicBodySchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  published: z.string().optional(),
});

router.put("/topics", async (req, res) => {
  try {
    const parsedBody = UpdatedTopicBodySchema.safeParse(req.body);
    if (parsedBody.error) {
      return res.status(400).send(`Unable to update item. Data is incomplete`);
    }
    const dataForTopicUpdate = parsedBody.data;
    const topicUpdated = await prisma.topics.update({
      where: {
        id: dataForTopicUpdate.id,
      },
      data: {
        description: dataForTopicUpdate.description,
        title: dataForTopicUpdate.title,
        published: dataForTopicUpdate.published,
      },
    });
    const whiteLabledTopicUpdated = whiteLabelTopic(topicUpdated);
    return res.json(whiteLabledTopicUpdated);
  } catch (err) {
    return res.sendStatus(500);
  }
});

const whiteLabelTopic = (topicFromDb) => {
  return {
    id: topicFromDb.id,
    title: topicFromDb.title,
    description: topicFromDb.description,
    published: topicFromDb.published,
    createdAt: topicFromDb.createdAt,
    updatedAt: topicFromDb.updatedAt,
  };
};
module.exports = router;
