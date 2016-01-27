class BadgesController < ApplicationController
  def index
    person = find_person(params[:person])
    p person
    person.badges.each do |badge|
      p badge.id
    end
    render :json => person, :include => :badges
  end

  def create
    person = Person.find(params[:person_id])
    person.badges.create(title: params[:badge], person_id: params[:person_id], points: 0)
    render :json => person, :include => :badges
  end

  def vote
    badge = Badge.find(params[:badge_id])
    person = Person.find(badge.person_id)
    badge.increment!(:points, by = 1) if params[:vote_type] == "up"
    badge.decrement!(:points, by = 1) if params[:vote_type] == "down"
    render :json => person, :include => :badges
  end

  private
  def find_person(location_hash)
    return Person.find_by_name(location_hash.slice(1..-1).capitalize)
  end

end
