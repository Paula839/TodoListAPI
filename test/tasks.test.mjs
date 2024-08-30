// NOT WORKING :(
import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // Adjust the path and extension as needed

describe('Tasks API', () => {

  // Test GET /tasks
  it('should retrieve all tasks', (done) => {
    request(app)
      .get('/tasks')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test POST /tasks
  it('should create a new task', (done) => {
    request(app)
      .post('/tasks')
      .send({
        title: 'New Task',
        description: 'Task Description',
        completed: false
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title', 'New Task');
        expect(res.body).to.have.property('description', 'Task Description');
        expect(res.body).to.have.property('completed', false);
        done();
      });
  });

  // Test PUT /tasks/:id
  it('should update an existing task', (done) => {
    // First, create a task
    request(app)
      .post('/tasks')
      .send({
        title: 'Task to Update',
        description: 'Task Description',
        completed: false
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const taskId = res.body.id;

        // Now, update the created task
        request(app)
          .put(`/tasks/${taskId}`)
          .send({
            title: 'Updated Task Title',
            description: 'Updated Task Description',
            completed: true
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.body).to.have.property('message', 'Task updated successfully');
            done();
          });
      });
  });

  it('should return an error for a non-existent task on update', (done) => {
    request(app)
      .put('/tasks/999999') // Assuming 999999 is a non-existent ID
      .send({
        title: 'Non-existent Task',
        description: 'This should fail',
        completed: false
      })
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('error', 'Task not found');
        done();
      });
  });

  // Test DELETE /tasks/:id
  it('should delete an existing task', (done) => {
    // First, create a task
    request(app)
      .post('/tasks')
      .send({
        title: 'Task to Delete',
        description: 'Task Description',
        completed: false
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const taskId = res.body.id;

        // Now, delete the created task
        request(app)
          .delete(`/tasks/${taskId}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.body).to.have.property('message', 'Task deleted successfully');
            done();
          });
      });
  });

  it('should return an error for a non-existent task on delete', (done) => {
    request(app)
      .delete('/tasks/999999') // Assuming 999999 is a non-existent ID
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('error', 'Task not found');
        done();
      });
  });

});
