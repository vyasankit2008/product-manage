const express =require('express');
const apiRouter = express.Router(); 
const db = require('./db');

apiRouter.get('/categories', async (req, res, next)=>{
    try{    
        const allCategories = await db.listAllCategories();          
        res.json({data: allCategories});  
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});


apiRouter.post('/categories', async (req, res, next)=>{
    try{
        const name = req.body.name ? req.body.name : '';
        let description = req.body.description ? req.body.description : '';

        if(!name || !description){
            return res.sendStatus(400).send('name and description fileds are required!');
        }                   

        const data =  await db.insertParentCategories(name, description);
        res.json({data: data});  
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});
 
apiRouter.post('/sub-categories', async (req, res, next)=>{
    try{
        const parent_cat_id = req.body.parent_cat_id ? req.body.parent_cat_id : '';
        const name = req.body.name ? req.body.name : '';
        let description = req.body.description ? req.body.description : '';
        let sub_cat_price = req.body.sub_cat_price ? req.body.sub_cat_price : '';
      
        if(!parent_cat_id){
            return res.sendStatus(500).send('parent categorie id is required!');        
        }        
        
        //find parent Categories data
        const getParentCategoriesData = await db.getCategoriesData(parent_cat_id);        
        console.log(getParentCategoriesData);

        //sub-Categories data insert            
        let parentCatId = getParentCategoriesData.id ? getParentCategoriesData.id : null;

        const data =  await db.insertSubCategories(parentCatId, name, description, sub_cat_price);
        res.json({data: data});  
    } catch(e){            
        console.log("e=========>",e);
        res.sendStatus(400);
    }
});

apiRouter.post('/orders', async (req, res, next)=>{
    try{
        const find_cat_id = req.body.parent_cat_id ? req.body.parent_cat_id : '';        
        const getCategoriesData = await db.getCategoriesData(find_cat_id);

        let sub_cat_id = getCategoriesData.id ? getCategoriesData.id : null;
        const name = req.body.name ? req.body.name : '';
        const quantity = req.body.qty ? req.body.qty : '';    
        let description = req.body.description ? req.body.description : '';        
        const sub_cat_amount = getCategoriesData.sub_cat_price ? getCategoriesData.sub_cat_price : '';
        let date = new Date();        

        const data =  await db.insertOrders(sub_cat_id, name, quantity, description, sub_cat_amount, date);
        res.json({data: data});
  
    } catch(e){            
        console.log("e=========>",e);
        res.sendStatus(400);
    }
});


module.exports = apiRouter;