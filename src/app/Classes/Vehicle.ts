/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
import { _name } from '../Interface/Name';

export class identity {
  _id!: string
  name!: _name
}

export class Make extends identity {
  private clicked?: boolean
  private completed?: boolean
  private show?: boolean
  private models: [Model]
  constructor () {
    super();
  } 
}

 class Model extends Make  {
    private trims: [Trim];
}

class Trim extends Model {
  private bodies: [Bodies]
  private engineSize: [identity]
}

class Bodies extends Trim {
  maxPrice: number
  minPrice: number
  image: string
  filtersId: [string]
  doorCount: [identity]
  error: string
}
