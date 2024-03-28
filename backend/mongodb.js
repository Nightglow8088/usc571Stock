
const { MongoClient } = require('mongodb');


// mongodb+srv://1679244026:<password>@cluster0.fhlqgxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const uri = "mongodb+srv://1679244026:5LWxTpHpbt5Ez0v3@cluster0.fhlqgxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const collectionName = 'favorites'
const dbName = "HK3"
const client = new MongoClient(uri);


async function main() {
    try {
        // 连接到MongoDB服务器
        await client.connect();
        console.log("Connected to MongoDB"); // 连接成功时会打印这条消息
        // 在这里添加你的数据库操作
    } catch (e) {
        console.error(e); // 如果有错误发生，会在这里打印错误信息
    } finally {
        // 关闭数据库连接
        await client.close();
    }

}


async function findCurrentMoney() {

    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const money = await collection.findOne({ name: 'money' });
      return money; 


    } finally {
      await client.close();
    }
}

async function addStock(ticker,newQuantityInt,newPriceInt, companyName) {

    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);

    //   const money = await collection.findOne({ name: 'money' });
      const result = await collection.findOneAndUpdate(
        { ticker: ticker }, // 查找条件
        {
          $inc: { quantity: newQuantityInt, totalPrice: newPriceInt }, // 递增操作
          $setOnInsert: { companyName: companyName } // 仅在插入新文档时设置companyName
        },
        {
          upsert: true, // 如果不存在则插入
          returnDocument: 'after' // 返回更新后的文档
        }
      );
  
      return result; 

    } finally {
      await client.close();
    }
}


async function tickerExist(ticker) {

    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const result = await collection.findOne({ ticker: ticker });

      if (result) {
        return true; // 找到文档，返回true
    } else {
        return false; // 没有找到文档，返回false
    }



    } finally {
      await client.close();
    }
}



// main().catch(console.error);

module.exports = { main, findCurrentMoney ,addStock, tickerExist};
