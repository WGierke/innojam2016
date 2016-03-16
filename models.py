__author__ = 'Aron'
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Location(Base):
    __tablename__ = 'locations'
    id = Column(Integer, primary_key=True)
    street = Column(String)
    city = Column(String)
    lat = Column(Float)
    lng = Column(Float)

    def __init__(self, id, street, city, lat, lng):
        self.id = id
        self.street = street
        self.city = city
        self.lat = lat
        self.lng = lng

"""
class Tours:

    def __init__(self, driver=None, price=None, timuntilarrival=None ,duration=None):
        self.driver =
        self.price = price
        self.timeuntilarrivel = timeuntilarrival
        self.duration = duration
        if query_result:
            self.load_from_tuple(query_result)

    def load_from_tuple(self, query_result):
        self.driver = query_result[0]
        self.price = query_result[1]
        self.timeuntilarrivel = query_result[2]
        self.duration = query_result[3]

class Driver:
    def __init__(self, name=None, picture=None, car=None):
        self.name = name
        self.picture = picture
        self.duration = duration
       if query_result:
           self.load_from_tuple(query_result)

    def load_from_tuple(self, query_result):
        self.name = query_result[0]
        self.picture = query_result[1]
        self.car = query_result[2]
"""
