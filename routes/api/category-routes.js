const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const category = await Category.findAll({
    include: [
      {
        model: Product,
        required: true,
      },
    ],
  });

  return res.json(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  });
  return res.json(category);
});

router.post("/", async (req, res) => {
  if (!req.body["category_name"]) {
    return res.json({
      message: "field is required",
    });
  }

  const category = await Category.create(await req.body);
  return res.json(category);
});

router.put("/:id", async (req, res) => {
  if (!req.body["category_name"]) {
    return res.json({
      message: "field is required",
    });
  }

  const category = await Category.update(await req.body, {
    where: { id: req.params.id },
  });
  return res.json(category);
});

router.delete("/:id", async (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json({
    message: "Deleted category " + req.params.id,
  });
});
module.exports = router;
