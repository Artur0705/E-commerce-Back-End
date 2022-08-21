const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const tags = await Tag.findAll({
    include: [
      {
        model: Product,
        required: true,
      },
    ],
  });
  return res.json(tags);
});

router.get("/:id", async (req, res) => {
  const tag = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        required: true,
      },
    ],
  });
  return res.json(tag);
});

router.post("/", async (req, res) => {
  // create a new tag
  if (!req.body["tag_name"]) {
    return res.json({
      message: "Tag field is required",
    });
  }

  const tag = await Tag.create(await req.body);
  return res.json(tag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.update(await req.body, {
    where: { id: req.params.id },
  });
  return res.json(tag);
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json({
    message: "Deleted tag " + req.params.id,
  });
});

module.exports = router;
