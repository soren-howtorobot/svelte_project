const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


router.post("/stashMons", (req, res) => {
    console.log(req.body.gen);
     const prismaQuery = async (mon) => {
      
        await prisma.pokemon.update({
          where:{
            id:mon.id
          },
          data: {
            id: mon.id,
            name: mon.name,
            generation: req.body.gen
          }
          
        });  
       
      
    };
    for (let i = 0; i < req.body.monData.length; i++) {
        const mon = req.body.monData[i];
        prismaQuery(mon); 
    } 
    
  res.send({ response: true,  message:'All good!'});
}); 
router.get('/get-mons/:id',(req,res)=>{
  
  async function main() {
      const allMons = await prisma.pokemon.findMany({
        where: {
          generation: parseInt(req.params.id)
        }
      });
      res.send(allMons);
  }
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

module.exports = router;