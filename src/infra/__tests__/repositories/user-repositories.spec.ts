import { connect, disconnect } from '../../helper/in-db-memory-server'
import { User } from '@/infra/db/schemas/user-schema-database'

// class AddUserRepository {
//   async add () {

//   }
// }

describe('addUserRepository', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await disconnect()
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('should create am user correctly', async () => {
    const workspace = new AddWorkSpaceRepository()
    const result = await workspace.Add({
      description: 'any',
      priority: 'any',
      owner: 'any'
    })

    expect(result).toBeDefined()
    expect(result.description).toBe('any')
    expect(result.priority).toBe('any')
    expect(result.owner).toBe('any')
  })
})
