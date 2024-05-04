## task >>
  
         make user Schema having firstname ,lastname ,email , password
         endpoints>>
         1.signUP
            // backend gets a body that has all the fields filled -> check through zod object->check if the user already exists -> make a token ->
         
         ..->issues >>
            1.salt can be either strig or buffer or a number .. or i can wait that like "const salt =await bcrypt.genSalt()"
            2.await must be put in all cases when database is fetched 
         -> get the user to the database >>
         -> use bcrypt to hash the password -> 
         2.signIN
         // backend gets authorization header and a body that has everything -> check the user exists -> check if the token is valid ->
         3.fetchAmount
         4.changePassword

## task = specifically user related routes has to be made>>
         ** before making all these user specific routes ..its clever to make an auth middleware so that all the user endpoints are safe or accessible for the verified users only>>
         
         1.Route to update user Information 
         2.Route to get users from BackEnd .. like filter via FirstName or LastName
         
## task = when the user signs up then only get a account added in the account model and that account must be having a ref to the user that just signed UP

## Account and money transfer related requests >> can be handled in diff route or wherever >> 

 basically 1. ive to fetch whatever amount the user has in one request and another to specifically get the money transfered >>
           2. the thing is AccountModdel is getting used .. what would be smarter having accountID in the body or in the query ..

   what i did>> i put the userID that the account has as its key .. in the query and got that using query.id ..
   if findone returns something then res.status(200) else error>>
0>   create a session object by await mogoose.session
0.1> "session.startTransaction" by this start the operation and then whenever the conditions are not met    "abortSession" 
1>   query lets the userId to be gotten by the BE and then find the acount 
2>   check if the acount has lesser money than the amount put in the body or accunt is non-existant only..
3>   find the user to whom the money would be sent ..if not gotten then again show error and else
4>   update both the account one getting some money added and another getting some money substracted
5>   after all these send a msg:"transfer is successful"


//what do i put to the endPoint to transfer money<>

 query having the userId of the user that sending the money >>
 
 req.body={
   to:"23-027r37yt83jnvksjdfnvsdk",
   amount:3200
 }


##  frontEnd > 
    
    routes:  there would be 4 main routes 
            i) Sign UP page where the user would signUP and if successfull would get directed to the dashBoard page
            ii)again same thing just sign in .. the user has to be already registerd or it will be told to register first
            iii) dashboard page : balances and to see other users there
            iv) send .. to send the money to a specific user>>