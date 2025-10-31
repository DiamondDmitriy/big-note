export default class CategoryEntity {
  constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _createAt: Date,
    private readonly _updateAt: Date,
  ) {}

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get createAt() {
    return this._createAt;
  }
  get updateAt() {
    return this._updateAt;
  }
}
