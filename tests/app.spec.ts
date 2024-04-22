import 'mocha'
import { expect } from 'chai';
import Card, { Carta, Tipo, Color, Rareza } from '../src/Carta.js';
import request from 'request'
import { assert } from 'chai'

// URL base del servidor
const baseUrl = 'http://localhost:3000';

// Descripción de las pruebas
  // Prueba para la ruta POST /cards
  describe('POST /cards', function() {
    it('Debería agregar una nueva carta al usuario', function(done) {
      const nuevacarta = new Card({
          id: 2,
          nombre: "LightningBolt",
          mana: 1,
          color: "rojo",
          tipo: "conjuro",
          rareza: "comun",
          reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
          valor_mercado: 1
      });
      request.post({
        url: baseUrl + '/card',
        json: true,
        body: nuevacarta
      }, function(error, response, body) {
        if(error){
          done(error)
        } else {
          assert.equal(response.statusCode, 200);
          done();
        }

      });
    });
  });


  // Prueba para la ruta DELETE /cards
  describe('DELETE /cards', function() {
    it('Debería dar error al eliminar la carta especificada del usuario', function(done) {
      request.delete(baseUrl + '/card', function(error, response, body) {
        assert.equal(response.statusCode, 200);
        done();
      });

      it('Debería eliminar la carta especificada del usuario', function(done) {
        request.delete(baseUrl + '/cards?usuario=test_user&Id=8', function(error, response, body) {
          assert.equal(response.statusCode, 200);
          done();
        });
      });
    });
  });

