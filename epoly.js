            google.maps.Polygon.prototype.Contains = function(point) {
                var j = 0;
                var oddNodes = false;
                var x = point.lng();
                var y = point.lat();
                for (var i = 0; i < this.getVertexCount(); i++) {
                    j++;
                    if (j == this.getVertexCount()) {
                        j = 0;
                    }
                    if (((this.getVertex(i).lat() < y) && (this.getVertex(j).lat() >= y)) || ((this.getVertex(j).lat() < y) && (this.getVertex(i).lat() >= y))) {
                        if (this.getVertex(i).lng() + (y - this.getVertex(i).lat()) / (this.getVertex(j).lat() - this.getVertex(i).lat()) * (this.getVertex(j).lng() - this.getVertex(i).lng()) < x) {
                            oddNodes = !oddNodes
                        }
                    }
                }
                return oddNodes;
            }

            // === A method which returns the approximate area of a non-intersecting polygon in square metres ===
            // === It doesn't fully account for spechical geometry, so will be inaccurate for large polygons ===
            // === The polygon must not intersect itself ===
            google.maps.Polygon.prototype.Area = function() {
                var a = 0;
                var j = 0;
                var b = this.Bounds();
                var x0 = b.getSouthWest().lng();
                var y0 = b.getSouthWest().lat();
                for (var i = 0; i < this.getVertexCount(); i++) {
                    j++;
                    if (j == this.getVertexCount()) {
                        j = 0;
                    }
                    var x1 = this.getVertex(i).distanceFrom(new google.maps.LatLng(this.getVertex(i).lat(), x0));
                    var x2 = this.getVertex(j).distanceFrom(new google.maps.LatLng(this.getVertex(j).lat(), x0));
                    var y1 = this.getVertex(i).distanceFrom(new google.maps.LatLng(y0, this.getVertex(i).lng()));
                    var y2 = this.getVertex(j).distanceFrom(new google.maps.LatLng(y0, this.getVertex(j).lng()));
                    a += x1 * y2 - x2 * y1;
                }
                return Math.abs(a * 0.5);
            }

            // === A method which returns the length of a path in metres ===
            google.maps.Polygon.prototype.Distance = function() {
                var dist = 0;
                for (var i = 1; i < this.getVertexCount(); i++) {
                    dist += this.getVertex(i).distanceFrom(this.getVertex(i - 1));
                }
                return dist;
            }

            // === A method which returns the bounds as a GLatLngBounds ===
            google.maps.Polygon.prototype.Bounds = function() {
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < this.getVertexCount(); i++) {
                    bounds.extend(this.getVertex(i));
                }
                return bounds;
            }

            // === A method which returns a GLatLng of a point a given distance along the path ===
            // === Returns null if the path is shorter than the specified distance ===
            google.maps.Polygon.prototype.GetPointAtDistance = function(metres) {
                // some awkward special cases
                if (metres == 0) return this.getVertex(0);
                if (metres < 0) return null;
                var dist = 0;
                var olddist = 0;
                for (var i = 1;
                    (i < this.getVertexCount() && dist < metres); i++) {
                    olddist = dist;
                    dist += this.getVertex(i).distanceFrom(this.getVertex(i - 1));
                }
                if (dist < metres) {
                    return null;
                }
                var p1 = this.getVertex(i - 2);
                var p2 = this.getVertex(i - 1);
                var m = (metres - olddist) / (dist - olddist);
                return new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m);
            }

            // === A method which returns the Vertex number at a given distance along the path ===
            // === Returns null if the path is shorter than the specified distance ===
            google.maps.Polygon.prototype.GetIndexAtDistance = function(metres) {
                // some awkward special cases
                if (metres == 0) return this.getVertex(0);
                if (metres < 0) return null;
                var dist = 0;
                var olddist = 0;
                for (var i = 1;
                    (i < this.getVertexCount() && dist < metres); i++) {
                    olddist = dist;
                    dist += this.getVertex(i).distanceFrom(this.getVertex(i - 1));
                }
                if (dist < metres) {
                    return null;
                }
                return i;
            }

            // === A function which returns the bearing between two vertices in decgrees from 0 to 360===
            // === If v1 is null, it returns the bearing between the first and last vertex ===
            // === If v1 is present but v2 is null, returns the bearing from v1 to the next vertex ===
            // === If either vertex is out of range, returns void ===
            google.maps.Polygon.prototype.Bearing = function(v1, v2) {
                    if (v1 == null) {
                        v1 = 0;
                        v2 = this.getVertexCount() - 1;
                    } else if (v2 == null) {
                        v2 = v1 + 1;
                    }
                    if ((v1 < 0) || (v1 >= this.getVertexCount()) || (v2 < 0) || (v2 >= this.getVertexCount())) {
                        return;
                    }
                    var from = this.getVertex(v1);
                    var to = this.getVertex(v2);
                    if (from.equals(to)) {
                        return 0;
                    }
                    var lat1 = from.latRadians();
                    var lon1 = from.lngRadians();
                    var lat2 = to.latRadians();
                    var lon2 = to.lngRadians();
                    var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
                    if (angle < 0.0) angle += Math.PI * 2.0;
                    angle = angle * 180.0 / Math.PI;
                    return parseFloat(angle.toFixed(1));
                }
                // === Copy all the above functions to GPolyline ===
            google.maps.Polyline.prototype.Contains = google.maps.Polygon.prototype.Contains;
            google.maps.Polyline.prototype.Area = google.maps.Polygon.prototype.Area;
            google.maps.Polyline.prototype.Distance = google.maps.Polygon.prototype.Distance;
            google.maps.Polyline.prototype.Bounds = google.maps.Polygon.prototype.Bounds;
            google.maps.Polyline.prototype.GetPointAtDistance = google.maps.Polygon.prototype.GetPointAtDistance;
            google.maps.Polyline.prototype.GetIndexAtDistance = google.maps.Polygon.prototype.GetIndexAtDistance;
            google.maps.Polyline.prototype.Bearing = google.maps.Polygon.prototype.Bearing;
          