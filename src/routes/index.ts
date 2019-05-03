import categoryRoutes from './category';
import skillRoutes from './skill';
import workRoutes from './work';

export default (app: any) => {
    app.use('/api/categories', categoryRoutes);
    app.use('/api/skills', skillRoutes);
    app.use('/api/works', workRoutes);
};
