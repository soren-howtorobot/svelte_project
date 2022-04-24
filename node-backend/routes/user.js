const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", (req, res) => {
    const prismaQuery = async () => {
      const user = await prisma.users.findFirst(
        {
          where: {
            user_name: req.body.data.username,
            user_password: req.body.data.password
          }
        }
      );

      user
        ? res.send({ response: true, data: user })
        : res.send({ response: false, data: {} });
    };
    prismaQuery()
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
});
router.post("/create", (req, res) => {
  let short = req.body.data;
  const prismaQuery = async () => {
    try {
      const user = await prisma.users.create({
        data: {
          user_name: short.cName,
          user_fName: short.cFirst,
          user_lName: short.cLast,
          user_password: short.cPassword,
        }
      });
      res.send({ response: true, data: user });
    } catch (error) {
      res.send({ response: false, data:{} }); 
    }
  };
  prismaQuery();
  
});

module.exports = router;
