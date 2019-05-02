import categoryRoutes from "./category";

export default (app) => {
    app.use('/api/category', categoryRoutes);
}