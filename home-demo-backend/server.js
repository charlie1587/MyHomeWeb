const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const filePath = path.join(__dirname, 'data.json');

// 获取购物清单数据
app.get('/api/shopping-list', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    const jsonData = JSON.parse(data);
    res.json({ data: jsonData });  // 将数据封装在 'data' 字段中
  });
});

// 更新购物清单数据
app.post('/api/shopping-list', (req, res) => {
  const newData = req.body.items;  // 获取更新后的购物清单数据
  
  fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error writing file' });
    }
    res.json({ message: 'File successfully updated' });
  });
});

// 启动服务器
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
