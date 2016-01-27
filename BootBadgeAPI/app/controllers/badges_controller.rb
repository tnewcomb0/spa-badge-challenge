class BadgesController < ApplicationController
  def index
    person = find_person(params[:person])
    badges = person.badges
    render :json => person, :include => :badges
  end

  def create
    person = Person.find(params[:person_id])
    person.badges.create(title: params[:badge], person_id: params[:person_id], points: 0)
    render :json => person, :include => :badges
  end

  def vote
    p params.inspect
    render :text => "voted"
  end

  private
  def find_person(location_hash)
    return Person.find_by_name(location_hash.slice(1..-1).capitalize)
  end

end
