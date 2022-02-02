const { response } = require('express')
const express=require('express')
const request=require('request')

const app=express()
const https=require('https')

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})


app.post('/',(req,res)=>{
    const first=req.body.f_name
    const second=req.body.s_name
    const email=req.body.email

    const data={
        members:[
            {
                email_address: email,
                status: 'subscribed',
                merge_fields:{
                    FNAME: first,
                    LNAME: second
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data)
    const url='https://us14.api.mailchimp.com/3.0/lists/18a3582a51'
    const options={
        method: 'POST',
        auth: 'amlan:f2fc9b44a932cd3da2fd133f707f9415-us14'

    }
    
    const request=https.request(url,options,(response)=>{
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+'/fail.html')
        }
        response.on('data',(data)=>{
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end()

})


app.listen(process.env.PORT,()=>{
    console.log('Server is running');
})
// f2fc9b44a932cd3da2fd133f707f9415-us14
//18a3582a51
//https://<dc>.api.mailchimp.com/3.0/