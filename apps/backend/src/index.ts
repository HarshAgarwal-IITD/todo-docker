import express from "express"
import {prisma} from "@repo/db"
const app = express();

app.use(express.json());
app.get("/todos",async (req,res)=>{
    const todos = await prisma.todo.findMany()
    console.log(todos);
    return res.status(200).json(todos);
})
app.post("/addTodo", async(req , res)=>{
    console.log(req.body)
    const todo = await prisma.todo.create({
        data:{
            userId:req.body.userId,
            title:"Todo"+new Date().toISOString(),
            completed:false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })
    return res.status(200).json(todo);
})
app.post("/createUser", async(req , res)=>{
    const user = await prisma.user.create({
        data:{
            name: req.body.name,
            email: req.body.email,
        }
    })
    return res.status(200).json(user);
})


app.listen(3001,()=>{
    console.log("Server running on port 3001")
})
