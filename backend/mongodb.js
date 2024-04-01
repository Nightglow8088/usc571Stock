
const { MongoClient } = require('mongodb');


// mongodb+srv://1679244026:<password>@cluster0.fhlqgxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const uri = "mongodb+srv://1679244026:5LWxTpHpbt5Ez0v3@cluster0.fhlqgxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const collectionName = 'favorites'
const dbName = "HK3"
const client = new MongoClient(uri);


let db;

// 连接到MongoDB数据库
async function connectToDatabase() {
  if (db) {
    return db;
  }
  
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
    return db;
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    throw e;
  }
}


async function findCurrentMoney() {

    try {
      const db = await connectToDatabase();
      const collection = db.collection(collectionName);

      const money = await collection.findOne({ name: 'money' });
      return money; 


    }catch (e) {
        console.error(e); // 如果有错误发生，会在这里打印错误信息
    } 

}

//购买
async function updateStockMoney(ticker,newQuantityInt,newPriceInt, companyName) {

    try {
      const newTicker = ticker.replace(/\s+/g, '');
      const db = await connectToDatabase();
      const collection = db.collection(collectionName);

    //   const money = await collection.findOne({ name: 'money' });
      const result = await collection.findOneAndUpdate(
        { ticker: newTicker, type: "buyed" }, // 查找条件
        {
          $inc: { quantity: newQuantityInt, totalPrice: newPriceInt }, // 递增操作
          $setOnInsert: { 
            companyName: companyName,
            type: "buyed" 
          } 
          // 仅在插入新文档时设置companyName
        },
        {
          upsert: true, // 如果不存在则插入
          returnDocument: 'after' // 返回更新后的文档
        }
      );

      // 根据"name"字段查找并更新钱包余额
      const moneyReduceResult = await collection.findOneAndUpdate(
        { name: "money" }, 
        {
            $inc: { "money": -newPriceInt } 
        },      
        {
          returnDocument: 'after' // 返回更新后的文档
        }
    );
  
      return moneyReduceResult; 

    } catch (e) {
        console.error(e); // 如果有错误发生，会在这里打印错误信息
    } 

}

async function updateStockMoneySell(ticker,newQuantity,newPriceInt) {

  try {
    const newTicker = ticker.replace(/\s+/g, '');
    const db = await connectToDatabase();

    const collection = db.collection(collectionName);

    // 首先获取当前股票信息
    const currentStock = await collection.findOne({ ticker: newTicker });


    // 计算更新后的quantity和totalPrice
    let updatedTotalPrice = currentStock.totalPrice- newPriceInt;
    const updatedQuantity = currentStock.quantity - newQuantity;


    // 确保totalPrice不小于0
    updatedTotalPrice = Math.max(updatedTotalPrice, 0);
    console.log(updatedTotalPrice+" "+updatedQuantity)

    //如果此时将买入的股票删干净了 清楚它在数据库的数据 
    if (updatedQuantity <= 0) {
      await collection.deleteOne({ ticker: newTicker, type: "buyed" });
  
    } 
    // 更新股票信息
    else {
      await collection.updateOne(
        { ticker: newTicker , type: "buyed"},
        {
          $set: { quantity: updatedQuantity, totalPrice: updatedTotalPrice }
        }
      );
    }

    // 根据"name"字段查找并更新钱包余额
    const moneyIncreaseResult = await collection.findOneAndUpdate(
      { name: "money" }, 
      {
          $inc: { "money": newPriceInt } 
      },      
      {
        returnDocument: 'after' // 返回更新后的文档
      }
  );

    return moneyIncreaseResult; 

  } catch (e) {
      console.error(e); // 如果有错误发生，会在这里打印错误信息
  } 

}


async function tickerExist(ticker) {

    try {
      const newTicker = ticker.replace(/\s+/g, '');
      const db = await connectToDatabase();

      const collection = db.collection(collectionName);

      const result = await collection.findOne({ ticker: newTicker, type:"buyed" });

      if (result) {
        return result; // 找到文档，返回找到的
    } else {
        return false; // 没有找到文档，返回null
    }



    } catch (e) {
        console.error(e); // 如果有错误发生，会在这里打印错误信息
    } 

}


async function findWatchList() {

  try {
    const db = await connectToDatabase();

    const collection = db.collection(collectionName);

    const result = collection.find({ type:"watchList" });

    const resultsArray = await result.toArray();

    return resultsArray; // 找不到就返回空列表



  } catch (e) {
      console.error(e); // 如果有错误发生，会在这里打印错误信息
  } 

}

async function insertWatchList(ticker, companyName) {

  try {
    const db = await connectToDatabase();

    const collection = db.collection(collectionName);

    const result = await collection.insertOne({
      ticker: ticker,
      companyName: companyName,
      type: "watchList"
    });


    return result; // 找不到就返回空列表



  } catch (e) {
      console.error(e); // 如果有错误发生，会在这里打印错误信息
  } 

}

async function deleteWatchList(ticker) {

  try {
    const db = await connectToDatabase();

    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ ticker: ticker, type: "watchList" });

    return result; // 找不到就返回空列表



  } catch (e) {
      console.error(e); // 如果有错误发生，会在这里打印错误信息
  } 

}

async function existWatchList(ticker) {

  try {
    const newTicker = ticker.replace(/\s+/g, '');
    const db = await connectToDatabase();

    const collection = db.collection(collectionName);

    const result = await collection.findOne({ ticker: newTicker, type:"watchList" });

    if (result) {
      return true; // 找到文档，返回找到的
  } else {
      return false; // 没有找到文档，返回null
  }



  } catch (e) {
      console.error(e); // 如果有错误发生，会在这里打印错误信息
  } 

}


async function showAllBuyedStocks() {

  try {
    const db = await connectToDatabase();

    const collection = db.collection(collectionName);

    const result = collection.find({ type:"buyed" });

    const resultsArray = await result.toArray();

    return resultsArray; 

  } catch (e) {
      console.error(e); // 如果有错误发生，会在这里打印错误信息
  } 

}



// main().catch(console.error);

module.exports = { findCurrentMoney ,updateStockMoney, updateStockMoneySell,tickerExist, findWatchList, insertWatchList,deleteWatchList,existWatchList,showAllBuyedStocks};
