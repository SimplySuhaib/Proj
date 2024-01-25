require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

//Get all users
app.get("/api/v1/data", async (req, res) => {
    try{
        const results= await db.query('select * from "user" ');
        console.log("Results : ");
        console.log(results);
        res.status(200).json({
        status:"success",
        results:results.rows.length,
        data:{
            users:results.rows,
        },
        
    });
    }catch(err){
        console.log(err);
    }
    
});
//Get a user
app.get("/api/v1/data/:userid",async (req,res)=>{
    console.log(req.params.userid);
    try{
        const results= await db.query('select * from "user" where userid=$1',[req.params.userid]);
        console.log("Results : ");
        console.log(results);
        res.status(200).json({
            status:"success2",
            data:{
                User:results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});

//Create a user
app.post('/api/v1/data', async (req, res) => {
    try {
      const { name, age, email, phoneno, org_id } = req.body;
      const result = await db.query('INSERT INTO "user" (name, age, email, phoneno, org_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, age, email, phoneno, org_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //Create an organisation
  app.post('/api/v1/organizations', async (req, res) => {
    try {
      const { name, gstin, location, brand, city, state } = req.body;
      const result = await db.query('INSERT INTO organization (name, gstin, location, brand, city, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, gstin, location, brand, city, state]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//Update User
app.put('/api/v1/data/:userid', async (req, res) => {
    try {
      const userid = req.params.userid;
      const { name, age, email } = req.body;
      const result = await db.query('UPDATE "user" SET name = $1, age = $2, email = $3 WHERE userid = $4 RETURNING *', [name, age, email, userid]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
//Delete User
app.delete('/api/v1/data/:userid', async (req, res) => {
    try {
      const userid = req.params.userid;
      const result = await db.query('DELETE FROM "user" WHERE userid = $1 RETURNING *', [userid]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//Update an organization
app.put('/api/v1/organizations/:org_id', async (req, res) => {
    try {
      const org_id = req.params.org_id;
      const { name, location } = req.body;
      const result = await db.query('UPDATE organization SET name = $1, location = $2 WHERE org_id = $3 RETURNING *', [name, location, org_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//Delete an oranization
app.delete('/api/v1/organizations/:org_id', async (req, res) => {
    try {
      const org_id = req.params.org_id;
      // Check if there are users attached to the organization before deleting
      const usersCount = await db.query('SELECT COUNT(*) FROM "user" WHERE org_id = $1', [org_id]);
      if (usersCount.rows[0].count > 0) {
        return res.status(400).json({ error: 'Cannot delete organization with attached users' });
      }
      // If no users attached, proceed with deletion
      const result = await db.query('DELETE FROM organization WHERE org_id = $1 RETURNING *', [org_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//To view the details of the user along with the organisation details the user belongs to
app.get('/api/v1/data/:userid/details', async (req, res) => {
    try {
      const userid = req.params.userid;
      const result = await db.query('SELECT u.*, o.* FROM "user" u INNER JOIN organization o ON u.org_id = o.org_id WHERE u.userid = $1', [userid]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const port = process.env.PORT || 3001;
app.listen(port,() =>{
    console.log(`server is up and listening on port ${port}`);
});