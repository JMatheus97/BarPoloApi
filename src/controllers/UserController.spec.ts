import request from 'supertest';
import app from '../../index'

const user = {
  nome: "João Matheus",
  userName: "Joao",
  password: "123",
  perfil: "Gerencial"
};

  describe('Teste userController', () => {
    it('should test create', async () => {
      const res = await request(app)
      .post('/user/new')
      .send(user)
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
    })
  })


