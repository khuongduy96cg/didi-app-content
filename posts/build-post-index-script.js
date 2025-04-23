const fs = require("fs");
const path = require("path");

const partitionDirectory = "./partition";
const files = fs.readdirSync(partitionDirectory);

const allPosts = [];
const index = {};

files.forEach((file) => {
  if (file.startsWith("post-") && file.endsWith(".json")) {
    const filePath = path.join(partitionDirectory, file);

    // Đọc và phân tích từng file JSON
    const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Thêm dữ liệu từ file vào mảng chung
    allPosts.push(...raw);

    raw.forEach((post) => {
      // Ghi thông tin về file vào index
      const key = post.slug;
      index[key] = {
        fileName: file,
        totalItems: raw.length,
      };
    });
  }
});

// Lưu tất cả các posts vào một file chung
fs.writeFileSync("all-posts.json", JSON.stringify(allPosts, null, 2));

// Lưu index vào file post-index.json
fs.writeFileSync("post-index.json", JSON.stringify(index, null, 2));

console.log("Post have been split and indexed successfully!");
