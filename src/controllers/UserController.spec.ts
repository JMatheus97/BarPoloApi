const request = require("supertest");
import { url } from '../../helpers/urlTest';

const user = {
  nome: "João Matheus",
  userName: "Joao",
  password: "123",
  perfil: "Gerencial"
};

  describe('Teste userController', () => {
    it('should test create', async () => {
      const res = await request(url)
      .post('/user/new')
      .send(user)
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
    })


  })


