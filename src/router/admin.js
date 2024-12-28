/*app.post('/admin', async(req, res)=>{
  const admin = new Admin({
      name: "Saad",
      passcode: "saadi1234",
      nickname: "saadiii",
  })

  try{
    await admin.save();
    res.send("Admin added succesfully");
  }
  catch(err){
    res.status(400).send(`Error occured: ${err.message}`)
  }
})

*/