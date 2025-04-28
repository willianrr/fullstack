import { app } from './app';
import { sequelize } from './config';

const PORT = process.env.PORT ?? 3000;

sequelize
  .sync({ alter: true })    
  .then(() => {
    console.log('🗄️  Banco sincronizado.');
    app.listen(PORT, () =>
      console.log(`🚀 Server listening on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Falha ao sincronizar banco:', err);
    process.exit(1);
  });
