'use strict'

import test, { beforeEach, afterEach, serial } from 'ava';
import { spy, sandbox as _sandbox } from 'sinon';
import proxyquire from 'proxyquire';

import { byId } from './fixtures/agent';

let config = {
  logging () {}
}

let MetricStub = {
  belongsTo: spy()
}

let id = 1
let AgentStub = null
let db = null
let sandbox = null

beforeEach(async () => {
  sandbox = _sandbox.create()

  AgentStub = {
    hasMany: sandbox.spy()
  }

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

afterEach(() => {
  sandbox && sandbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
})

serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentModel')
})

serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)

  t.deepEqual(agent, byId(id), 'should be the same')
})