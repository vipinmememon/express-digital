import 'dotenv/config'
import express from 'express';

const port=process.env.PORT || 3000;
const app=express();
app.use(express.json()) //extract data in json format

let teaData=[];  //make a array to store data and aslo make a unique id
let nextId=1;
//add data

app.post('/tea',(req,res)=>{      
    const {name,price}=req.body;
    const newTea={id:nextId++,name:name,price:price};
    teaData.push(newTea);
    res.status(200).send(newTea);

})

//get all tea
app.get("/tea",(req,res)=>{
    res.status(200).send(teaData);
})
/
//get tea with id
app.get('/tea/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found');
    }
    res.status(200).send(tea);
})

//update tea

app.put("/tea/:id",(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        return res.status(404).send('Tea not found');
    }
    const {name,price}=req.body;
    tea.name=name;
    tea.price=price;
    res.status(201).send(tea)
})

//delete tea

app.delete('/tea/:id',(req,res)=>{
    const index=teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if(index===-1){
        return res.status(404).send("index not found");
    }
    teaData.splice(index,1);
    res.status(200).send("deleted");
})


app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}...`);
    
})

