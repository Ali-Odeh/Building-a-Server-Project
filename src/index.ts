import app from "./server";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  
  console.log(`Server started on http://localhost:${PORT}`);
});
