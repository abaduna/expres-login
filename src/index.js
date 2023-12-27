const express = require("express")
const morgan = require("morgan")
const database = require("./database")
const cors = require("cors")


const app = express()

app.use(cors());
app.use(morgan("dev"))

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());


app.get("/api",async(req,res)=>{
    const connection = await database.getConnection();
    try {
    
    const result = await connection.query("SELECT * from userioss"); 
    
    console.log(result);
    res.status(200).json(result);
   
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "Error en la consulta" });
    }
   
})
app.get("/api/:id",async(req,res)=>{
    const connection = await database.getConnection();
    const id = req.params.id
    try {
    
    //const result = await connection.query("SELECT * from userioss where id = ?" [id]); 
    const result = await connection.query("SELECT * FROM userioss WHERE id = ?", [id]);
    if (result.length === 0) {
        return res.status(500).json({ error: "No se encuentra use usuario" });
    }
    console.log(result);
    res.status(200).json(result);
   
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "No se encuentra use usuario" });
    }
   
})
app.post("/api", async (req, res) => {
     const {username,password,rool} = req.body
    

    const connection = await database.getConnection();
    try {
        const query = 'INSERT INTO userioss (username, password, rool) VALUES (?, ?, ?)';
    
    // Utiliza una sentencia preparada para evitar SQL injection
    const result = await connection.query(query, [username, password, rool]);
    res.status(200).json({ message: 'Blog agregado con éxito' });        
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "Error en la consulta" });
    }
   
    
});
app.listen(4000,()=>{
    console.log(`corriendo por el puerto 3000`);
})