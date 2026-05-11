const { auths, cart } = require("../schema/schemas");

const aggregation = async (req,res)=>{
    console.log("hi");
    // const data = await auths.aggregate([
    //     {
    //         $match : {
    //             // gender : "female"
    //             // role : "admin"
    //             // age : { $lt : 30 }
    //             // age : { $gt : 25 }
    //         }
    //     }
    // ])
    // const data = await auths.aggregate([
        //     {
            //         $project : {
                //             name : 1,
                //             age : 1,
                //             _id : 0
                //             mobile : 0
                //         }
                //     }
                // ])
                
        // const data = await auths.aggregate([
        //     {
        //         $sort : {
        //             // name : 1
        //             // mobile : 1
        //             // age : -1 
        //             // age : 1 
        //         }
        //     }
        // ])
        // const data = await auths.aggregate([
        //     {
        //         // $limit : 2
        //         $limit : 5
        //     }
        // ])
        // let page =5
        // let limit = 2
        // const data = await auths.aggregate([
        //     {
        //         $skip : (page-1)*limit
        //     },
        //     {
        //         $limit : 2                
        //     }
        // ])

        // const data = await auths.aggregate([
        //     {
                // $group : {
                // _id : "$gender",
                // count : {$sum : 1}
                // }

                // $group : {
                // _id : "null",                    
                // average : { $avg : "$age" }
                // }      
                
                // $group : {
                // _id : "null",                    
                // totalAge : { $sum : "$age" }
                // }   
                
                // $group : {
                // _id : "null",                    
                // minimumAge : { $min : "$age" }
                // }      
                
        //         $group : {
        //         _id : "null",                    
        //         maximumAge : { $max : "$age" }
        //         }                    
        //     }
        // ])        
const data = await cart.aggregate([
    // {
    //     $unwind : "$items"
    // },
    // {
    //     $group : {
    //         _id : "$items.productId",
    //         orderQuantity : {$sum : "$items.quantity"}
    //     }
    // }
    {
        $lookup : {
            from : "auths",
            localField : "userId",
            foreignField : "_id",
            as : "userData"
        }
    },
    {
       $unwind : "$userData" 
    },
    {
        $project : {
            _id : 0,
           'username': "$userData.name"
        }
    }
])
    res.json({data})
}

module.exports = aggregation