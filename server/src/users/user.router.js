const { Router } = require("express");
const UserController = require("./user.controller");
const { payloadValidator } = require("../middlewares/payloadValidator");
const { queryValidator } = require("../middlewares/queryValidator");

const userController = new UserController();

const router = Router({ mergeParams: true });

const productTypes = ["background", "music", "profile-image"];

router.post("/", payloadValidator(["username", "email"]), async (req, res) => {
  res.json(await userController.createUser(req.body.email, req.body.username));
});

router.get("/", async (req, res) => {
  res.json(await userController.getUser(req.query));
});

router.get("/username-suggestion", async (req, res) => {
  res.json(await userController.getNameSuggestion(req.query.username));
});

router.patch("/", [payloadValidator(["username"])], async (req, res) => {
  const filteredUsersPromise = userController.getUser(req.query);
  const userWithSameUsernamePromise = userController.getUser({
    username: req.body.username,
  });
  const [filteredUsers, userWithSameUsername] = await Promise.all([
    filteredUsersPromise,
    userWithSameUsernamePromise,
  ]);
  if (filteredUsers.length === 0) {
    res.status(404).json("User not found");
  } else if (filteredUsers.length > 1) {
    res.status(409).json("No unique user with current query parameters");
  } else if (userWithSameUsername.length !== 0) {
    res.status(409).json("Username exists");
  } else {
    await userController.updateUsername(filteredUsers[0], req.body.username);
    res.status(204).json();
  }
});

router.post(
  "/purchase",
  [queryValidator(["userId", "productId"])],
  async (req, res) => {
    const { userId, productId } = req.query;
    const user = await userController.findById(userId);
    const product = await userController.findProductById(productId);
    if (user.coins < product.price) {
      res.status(400).json("You don't have enough coins");
    } else if (await userController.checkExistProduct(productId, userId)) {
      res.status(409).json("You have this product");
    } else {
      await userController.purchaseProduct(productId, userId);
      res.status(204).json("purchase successfully");
    }
  }
);

router.post(
  "/todo",
  [queryValidator(["userId"]), payloadValidator(["content"])],
  async (req, res) => {
    const user = await userController.findById(req.query.userId);
    if (!user) {
      res.status(404).json("User not found");
    } else {
      await userController.addTodo(user, req.body.content);
      res.status(201).json();
    }
  }
);

router.patch(
  "/todo/toggle",
  [queryValidator(["userId"]), payloadValidator(["content"])],
  async (req, res) => {
    const user = await userController.findById(req.query.userId);
    if (!user) {
      res.status(404).json("User not found");
    } else {
      await userController.toggleTodo(user, req.body.content);
      res.status(201).json();
    }
  }
);

router.patch(
  "/experience/add",
  [queryValidator(["userId"])],
  async (req, res) => {
    const user = await userController.findById(req.query.userId);
    if (!user) {
      res.status(404).json("User not found");
    } else {
      await userController.addExperience(req.query.userId);
      res.status(201).json();
    }
  }
);

router.get(
  "/assets",
  [queryValidator(["userId", "type"])],
  async (req, res) => {
    const { userId, type } = req.query;
    if (!productTypes.includes(type)) {
      res
        .status(400)
        .json(
          `Invalid type: product must be of type [${productTypes.join(", ")}]`
        );
    } else {
      res.json(await userController.findUserProductByType(userId, type));
    }
  }
);

router.put(
  "/updateName",
  [payloadValidator(["name", "userId"])],
  async (req, res) => {
    const { name, userId } = req.body;
    await userController.updateName(userId, name);
  }
);

router.put(
  "/updateProfileImage",
  [payloadValidator(["url", "userId"])],
  async (req, res) => {
    const { url, userId } = req.body;
    await userController.updateProfileImage(userId, url);
  }
);

module.exports = router;
