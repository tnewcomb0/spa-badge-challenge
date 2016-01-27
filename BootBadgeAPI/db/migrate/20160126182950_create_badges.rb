class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :title
      t.integer :points
      t.references :person

      t.timestamps null: false
    end
  end
end
