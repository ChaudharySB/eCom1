const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
 require("dotenv").config();
const Stripe = require('stripe')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtKey = 'e-comm';

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://e-com1-five.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 8080;
console.log(process.env.MONGODB_URL);

                                                           // mongodb connection--------------------------------
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URL,{ useNewUrlParser: true })
    .then(() => console.log("Connect to Databse"))
    .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
});
const userModel = mongoose.model("user", userSchema);

                             //api-----------------------
app.get("/", (req, res) => {
    res.send("Server is running");
});

                                                  //sign up----------------------------------------
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            res.status(400).send({ message: "Email id is already registered", alert: false });
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new userModel({ ...req.body, password: hashedPassword });
            const savedUser = await newUser.save();
            res.send({ message: "Successfully signed up NEW user", alert: true });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send({ message: "Server error", alert: false });
    }
});

                                                     //api login----------------
 // Import the 'jsonwebtoken' module

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            // Generate a JWT token
            const token = jwt.sign({ user: existingUser }, jwtKey, { expiresIn: "2h" });

            const dataSend = {
                _id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                image: existingUser.image,
            };

            res.status(200).json({
                message: "Login is successful",
                alert: true,
                data: dataSend,
                auth: token, // Include the JWT token in the response
            });
        } else {
            res.status(400).json({
                message: "User not found, please sign up",
                alert: false,
            });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", alert: false });
    }
});



                                     //product section
const schemaProduct = mongoose.Schema({
    name : "string",
    category : "string",
    image : "string",
    price : "string",
    description : "string"
});
const productModel = mongoose.model("product", schemaProduct);

                                   //save product in data
                                             //api
app.post("/uploadProduct",async (req, res) => {
    try {
        // Assuming you have some validation logic here for req.body
        if (!req.body) {
            throw new Error("Invalid product data");
        }

        const data = await productModel(req.body);
        const datasave = await data.save();

        res.send({ message: "Upload successfully" });
    } catch (error) {
        console.error("Error while uploading product:", error);
        res.status(500).send({ error: "An error occurred while uploading the product" });
    }
});


app.delete("/deleteProduct/:productId", async (req, res) => {
    const productId = req.params.productId;

    try {
        // Assuming you are using Mongoose, you can use the following code to delete the product by its ID.
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            // Product with the given ID was not found
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        // Handle errors here
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "An error occurred while deleting the product", error: error.message });
    }
});



app.get("/product",async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})
                                           /*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

    try{
        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : "auto",
            shipping_options : [{shipping_rate : "shr_1O2TIYSJ5iNBfzskJvR14CLF"}],

            line_items : req.body.map((item)=>{
                return{
                    price_data : {
                        currency : "inr",
                        product_data : {
                            name : item.name,
                            // images : [item.image]
                        },
                        unit_amount : item.price * 100,
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1,
                    },
                    quantity : item.qty
                }
            }),

            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`,

        }


        const session = await stripe.checkout.sessions.create(params)
        // console.log(session)
        res.status(200).json(session.id)
    }
    catch (err){
        res.status(err.statusCode || 500).json(err.message)
    }

})

function verifyToken(req, resp, next) {
    let token = req.headers.authorization;
    if (token){
        token = token.split(' ')[1];
        console.log("token", token);
        jwt.verify(token,jwtKey,(err,valid)=>{
            if (err) {
                resp.status(401).send({result:"pleas add valid token"});
            } else {
                next();
            }
        });

    }else {
        resp.send({result:"pleas add token"});
    }
}

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
