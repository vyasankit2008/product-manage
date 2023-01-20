const mysql = require('mysql'); 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});


pool.getConnection( (err, connection)=> {
    if (err) throw (err);
    console.log ("DB connected successful ");
});


let db = {};

db.insertParentCategories = (name, description) => {
    return new Promise((resolve, reject)=>{
        //parent Categories data insert in db        
        pool.query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description], (error, result)=>{
            if(error) return reject(error);           
            return resolve({sccess:true});
        });
    });
};

db.insertSubCategories = (parent_cat_id, name, description, sub_cat_price) => {
    return new Promise((resolve, reject)=>{            
        pool.query('INSERT INTO categories (parent_cat_id, name, description, sub_cat_price) VALUES (?, ?, ?, ?)', [parent_cat_id, name, description, sub_cat_price], (error, result)=>{
            if(error) return reject(error);               
            return resolve({sccess:true});
        });        
    });
};

db.getCategoriesData = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM categories WHERE id = ?', [id], (error, data)=>{
            if(error) return reject(error);                    

            return resolve(data.length > 0 ? data[0] : null);
        });
    });
};

db.insertOrders = (sub_cat_id, name, quantity, description, sub_cat_amount, date) => {
    return new Promise((resolve, reject)=>{            
        pool.query('INSERT INTO orders (sub_cat_id, name, quantity, description, sub_cat_amount, date) VALUES (?, ?, ?, ?, ? , ?)', [sub_cat_id, name, quantity, description, sub_cat_amount, date], (error, result)=>{
            if(error) return reject(error);               
            return resolve({sccess:true});
        });        
    });
};

db.listAllCategories = () => {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM categories', [], (error, data)=>{
            if(error) return reject(error);

            return resolve(data.length > 0 ? data : null);
        });
    });
};
   
module.exports = db