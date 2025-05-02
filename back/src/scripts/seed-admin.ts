import { Users } from '@models/users/users.model';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { sequelize } from '../config';

(async () => {
  await sequelize.sync();
  const count = await Users.count({ where: { role: 'admin' } });
  if (count === 0) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
    await Users.create({
      nome:            process.env.ADMIN_NAME!,
      email:           process.env.ADMIN_EMAIL!,
      telefone:        process.env.ADMIN_PHONE!,
      dataNascimento:  process.env.ADMIN_DOB!,
      senha:           hash,
      role:            'admin',
    });
    console.log('Admin seed criado');
  }
  process.exit(0);
})();
