import {
  MONGO_DB_PASS,
  MONGO_DB_USER,
  MONGO_DB_URL
} from "../confs"

let get_mongoose_connection = () => {
  return mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    auth: {
      "authSource": "admin"
    },
    user: MONGO_DB_USER,
    pass: MONGO_DB_PASS
  })
}

export default class CardDatasource {
  constructor(datasource){
    if(!datasource) {
      // init the mongo db datasource
      this.CardModelPromise = get_mongoose_connection()
      .then(mongose_connection => {
        let card_schema = new mongose_connection.Schema( 
          { 
            name: String,
            description: String,
            type: String,
            image_url: String,
            metadata: Object
          }, 
          { strict: false }
        )
        return mongose_connection.model('Cards', card_schema)
      })
    }
  }

  async get({id, filter}){
    let id_obj = id === undefined ? {} : {_id: id}
    let query = Object.assign({}, id_obj, filter)
    let cardModel = await this.CardModelPromise()
    return cardModel.find(query)
  }

  async create({id, filter}) {

  }

  async update() {

  }

  async delete() {

  }

}