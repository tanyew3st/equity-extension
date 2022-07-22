var ntc = {

    init: function() {
      var color, rgb, hsl;
      for(var i = 0; i < ntc.names.length; i++)
      {
        color = "#" + ntc.names[i][0];
        rgb = ntc.rgb(color);
        hsl = ntc.hsl(color);
        ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
      }
    },
  
    name: function(color) {
  
      color = color.toUpperCase();
      if(color.length < 3 || color.length > 7)
        return ["#000000", "Invalid Color: " + color, "#000000", "", false];
      if(color.length % 3 == 0)
        color = "#" + color;
      if(color.length == 4)
        color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);
  
      var rgb = ntc.rgb(color);
      var r = rgb[0], g = rgb[1], b = rgb[2];
      var hsl = ntc.hsl(color);
      var h = hsl[0], s = hsl[1], l = hsl[2];
      var ndf1 = 0, ndf2 = 0, ndf = 0;
      var cl = -1, df = -1;
  
      for(var i = 0; i < ntc.names.length; i++)
      {
        if(color == "#" + ntc.names[i][0])
          return ["#" + ntc.names[i][0], ntc.names[i][1], ntc.shadergb(ntc.names[i][2]), ntc.names[i][2], true];
  
        ndf1 = Math.pow(r - ntc.names[i][3], 2) + Math.pow(g - ntc.names[i][4], 2) + Math.pow(b - ntc.names[i][5], 2);
        ndf2 = Math.abs(Math.pow(h - ntc.names[i][6], 2)) + Math.pow(s - ntc.names[i][7], 2) + Math.abs(Math.pow(l - ntc.names[i][8], 2));
        ndf = ndf1 + ndf2 * 2;
        if(df < 0 || df > ndf)
        {
          df = ndf;
          cl = i;
        }
      }
  
      return (cl < 0 ? ["#000000", "Invalid Color: " + color, "#000000", "", false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], ntc.shadergb(ntc.names[cl][2]), ntc.names[cl][2], false]);
    },
  
    // adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    hsl: function (color) {
  
      var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
      var min, max, delta, h, s, l;
      var r = rgb[0], g = rgb[1], b = rgb[2];
  
      min = Math.min(r, Math.min(g, b));
      max = Math.max(r, Math.max(g, b));
      delta = max - min;
      l = (min + max) / 2;
  
      s = 0;
      if(l > 0 && l < 1)
        s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
  
      h = 0;
      if(delta > 0)
      {
        if (max == r && max != g) h += (g - b) / delta;
        if (max == g && max != b) h += (2 + (b - r) / delta);
        if (max == b && max != r) h += (4 + (r - g) / delta);
        h /= 6;
      }
      return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
    },
  
    // adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    rgb: function(color) {
      return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
    },
    
    shadergb: function (shadename) {
      for(var i = 0; i < ntc.shades.length; i++) {
        if(shadename == ntc.shades[i][1])
          return "#" + ntc.shades[i][0];
      }
      return "#000000";
    },
    
    shades: [
  ["FF0000", "Red"],
  ["FFA500", "Orange"],
  ["FFFF00", "Yellow"],
  ["008000", "Green"],
  ["0000FF", "Blue"],
  ["EE82EE", "Violet"],
  ["A52A2A", "Brown"],
  ["000000", "Black"],
  ["808080", "Grey"],
  ["FFFFFF", "White"]
  ],
  
    names: [
  ["35312C", "Acadia", "Brown"],
  ["75AA94", "Acapulco", "Green"],
  ["C0E8D5", "Aero Blue", "Green"],
  ["745085", "Affair", "Violet"],
  ["905E26", "Afghan Tan", "Yellow"],
  ["5D8AA8", "Air Force Blue", "Blue"],
  ["BEB29A", "Akaroa", "Yellow"],
  ["F2F0E6", "Alabaster", "Grey"],
  ["E1DACB", "Albescent White", "Yellow"],
  ["954E2C", "Alert Tan", "Orange"],
  ["F0F8FF", "Alice Blue", "Blue"],
  ["E32636", "Alizarin", "Red"],
  ["1F6A7D", "Allports", "Blue"],
  ["EED9C4", "Almond", "Yellow"],
  ["9A8678", "Almond Frost", "Brown"],
  ["AD8A3B", "Alpine", "Yellow"],
  ["CDC6C5", "Alto", "Grey"],
  ["848789", "Aluminium", "Grey"],
  ["E52B50", "Amaranth", "Red"],
  ["387B54", "Amazon", "Green"],
  ["FFBF00", "Amber", "Yellow"],
  ["8A7D72", "Americano", "Brown"],
  ["9966CC", "Amethyst", "Violet"],
  ["95879C", "Amethyst Smoke", "Violet"],
  ["F5E6EA", "Amour", "Violet"],
  ["7D9D72", "Amulet", "Green"],
  ["8CCEEA", "Anakiwa", "Blue"],
  ["6C461F", "Antique Brass", "Orange"],
  ["FAEBD7", "Antique White", "White"],
  ["C68E3F", "Anzac", "Yellow"],
  ["D3A95C", "Apache", "Yellow"],
  ["66B348", "Apple", "Green"],
  ["A95249", "Apple Blossom", "Red"],
  ["DEEADC", "Apple Green", "Green"],
  ["FBCEB1", "Apricot", "Orange"],
  ["F7F0DB", "Apricot White", "Yellow"],
  ["00FFFF", "Aqua", "Blue"],
  ["D9DDD5", "Aqua Haze", "Grey"],
  ["E8F3E8", "Aqua Spring", "Green"],
  ["DBE4DC", "Aqua Squeeze", "Grey"],
  ["7FFFD4", "Aquamarine", "Blue"],
  ["274A5D", "Arapawa", "Blue"],
  ["484A46", "Armadillo", "Grey"],
  ["4B5320", "Army green", "Green"],
  ["827A67", "Arrowtown", "Yellow"],
  ["3B444B", "Arsenic", "Grey"],
  ["BEBAA7", "Ash", "Green"],
  ["7BA05B", "Asparagus", "Green"],
  ["EDD5A6", "Astra", "Yellow"],
  ["376F89", "Astral", "Blue"],
  ["445172", "Astronaut", "Blue"],
  ["214559", "Astronaut Blue", "Blue"],
  ["DCDDDD", "Athens Grey", "Grey"],
  ["D5CBB2", "Aths Special", "Yellow"],
  ["9CD03B", "Atlantis", "Green"],
  ["2B797A", "Atoll", "Green"],
  ["3D4B52", "Atomic", "Blue"],
  ["FF9966", "Atomic Tangerine", "Orange"],
  ["9E6759", "Au Chico", "Brown"],
  ["372528", "Aubergine", "Brown"],
  ["712F2C", "Auburn", "Brown"],
  ["EFF8AA", "Australian Mint", "Green"],
  ["95986B", "Avocado", "Green"],
  ["63775A", "Axolotl", "Green"],
  ["F9C0C4", "Azalea", "Red"],
  ["293432", "Aztec", "Green"],
  ["F0FFFF", "Azure", "Blue"],
  ["6FFFFF", "Baby Blue", "Blue"],
  ["25597F", "Bahama Blue", "Blue"],
  ["A9C01C", "Bahia", "Green"],
  ["5C3317", "Baker's Chocolate", "Brown"],
  ["849CA9", "Bali Hai", "Blue"],
  ["3C3D3E", "Baltic Sea", "Grey"],
  ["FBE7B2", "Banana Mania", "Yellow"],
  ["878466", "Bandicoot", "Green"],
  ["D2C61F", "Barberry", "Green"],
  ["B6935C", "Barley Corn", "Yellow"],
  ["F7E5B7", "Barley White", "Yellow"],
  ["452E39", "Barossa", "Violet"],
  ["2C2C32", "Bastille", "Blue"],
  ["51574F", "Battleship Grey", "Grey"],
  ["7BB18D", "Bay Leaf", "Green"],
  ["353E64", "Bay Of Many", "Blue"],
  ["8F7777", "Bazaar", "Brown"],
  ["EBB9B3", "Beauty Bush", "Red"],
  ["926F5B", "Beaver", "Brown"],
  ["E9D7AB", "Beeswax", "Yellow"],
  ["F5F5DC", "Beige", "Brown"],
  ["86D2C1", "Bermuda", "Green"],
  ["6F8C9F", "Bermuda Grey", "Blue"],
  ["BCBFA8", "Beryl Green", "Green"],
  ["F4EFE0", "Bianca", "Yellow"],
  ["334046", "Big Stone", "Blue"],
  ["3E8027", "Bilbao", "Green"],
  ["AE99D2", "Biloba Flower", "Violet"],
  ["3F3726", "Birch", "Yellow"],
  ["D0C117", "Bird Flower", "Green"],
  ["2F3C53", "Biscay", "Blue"],
  ["486C7A", "Bismark", "Blue"],
  ["B5AC94", "Bison Hide", "Yellow"],
  ["FFE4C4", "Bisque", "Brown"],
  ["3D2B1F", "Bistre", "Brown"],
  ["88896C", "Bitter", "Green"],
  ["D2DB32", "Bitter Lemon", "Green"],
  ["FE6F5E", "Bittersweet", "Orange"],
  ["E7D2C8", "Bizarre", "Orange"],
  ["000000", "Black", "Black"],
  ["232E26", "Black Bean", "Green"],
  ["2C3227", "Black Forest", "Green"],
  ["E0DED7", "Black Haze", "Grey"],
  ["332C22", "Black Magic", "Brown"],
  ["383740", "Black Marlin", "Blue"],
  ["1E272C", "Black Pearl", "Blue"],
  ["2C2D3C", "Black Rock", "Blue"],
  ["532934", "Black Rose", "Red"],
  ["24252B", "Black Russian", "Grey"],
  ["E5E6DF", "Black Squeeze", "Grey"],
  ["E5E4DB", "Black White", "Grey"],
  ["43182F", "Blackberry", "Violet"],
  ["2E183B", "Blackcurrant", "Violet"],
  ["D9D0C1", "Blanc", "Yellow"],
  ["FFEBCD", "Blanched Almond", "Brown"],
  ["EBE1CE", "Bleach White", "Yellow"],
  ["A3E3ED", "Blizzard Blue", "Blue"],
  ["DFB1B6", "Blossom", "Red"],
  ["0000FF", "Blue", "Blue"],
  ["62777E", "Blue Bayoux", "Blue"],
  ["9999CC", "Blue Bell", "Blue"],
  ["E3D6E9", "Blue Chalk", "Violet"],
  ["262B2F", "Blue Charcoal", "Blue"],
  ["408F90", "Blue Chill", "Green"],
  ["4B2D72", "Blue Diamond", "Violet"],
  ["35514F", "Blue Dianne", "Green"],
  ["4B3C8E", "Blue Gem", "Violet"],
  ["BDBACE", "Blue Haze", "Violet"],
  ["00626F", "Blue Lagoon", "Green"],
  ["6A5BB1", "Blue Marguerite", "Violet"],
  ["D8F0D2", "Blue Romance", "Green"],
  ["78857A", "Blue Smoke", "Green"],
  ["166461", "Blue Stone", "Green"],
  ["8A2BE2", "Blue Violet", "Violet"],
  ["1E3442", "Blue Whale", "Blue"],
  ["3C4354", "Blue Zodiac", "Blue"],
  ["305C71", "Blumine", "Blue"],
  ["B55067", "Blush", "Red"],
  ["2A2725", "Bokara Grey", "Grey"],
  ["79443B", "Bole", "Brown"],
  ["AEAEAD", "Bombay", "Grey"],
  ["DFD7D2", "Bon Jour", "Grey"],
  ["0095B6", "Bondi Blue", "Blue"],
  ["DBC2AB", "Bone", "Orange"],
  ["4C1C24", "Bordeaux", "Red"],
  ["4C3D4E", "Bossanova", "Violet"],
  ["438EAC", "Boston Blue", "Blue"],
  ["92ACB4", "Botticelli", "Blue"],
  ["254636", "Bottle Green", "Green"],
  ["7C817C", "Boulder", "Grey"],
  ["A78199", "Bouquet", "Violet"],
  ["AF6C3E", "Bourbon", "Orange"],
  ["5B3D27", "Bracken", "Brown"],
  ["DCB68A", "Brandy", "Orange"],
  ["C07C40", "Brandy Punch", "Orange"],
  ["B6857A", "Brandy Rose", "Red"],
  ["B5A642", "Brass", "Yellow"],
  ["517B78", "Breaker Bay", "Green"],
  ["C62D42", "Brick Red", "Red"],
  ["F8EBDD", "Bridal Heath", "Orange"],
  ["FAE6DF", "Bridesmaid", "Orange"],
  ["66FF00", "Bright Green", "Green"],
  ["57595D", "Bright Grey", "Grey"],
  ["922A31", "Bright Red", "Red"],
  ["ECBD2C", "Bright Sun", "Yellow"],
  ["08E8DE", "Bright Turquoise", "Blue"],
  ["FF55A3", "Brilliant Rose", "Red"],
  ["FB607F", "Brink Pink", "Red"],
  ["004225", "British Racing Green", "Green"],
  ["A79781", "Bronco", "Brown"],
  ["CD7F32", "Bronze", "Brown"],
  ["584C25", "Bronze Olive", "Yellow"],
  ["434C28", "Bronzetone", "Yellow"],
  ["EECC24", "Broom", "Yellow"],
  ["A52A2A", "Brown", "Brown"],
  ["53331E", "Brown Bramble", "Brown"],
  ["594537", "Brown Derby", "Brown"],
  ["3C241B", "Brown Pod", "Brown"],
  ["E6F2EA", "Bubbles", "Green"],
  ["6E5150", "Buccaneer", "Red"],
  ["A5A88F", "Bud", "Green"],
  ["BC9B1B", "Buddha Gold", "Yellow"],
  ["F0DC82", "Buff", "Yellow"],
  ["482427", "Bulgarian Rose", "Red"],
  ["75442B", "Bull Shot", "Orange"],
  ["292C2F", "Bunker", "Grey"],
  ["2B3449", "Bunting", "Blue"],
  ["800020", "Burgundy", "Red"],
  ["DEB887", "Burly Wood", "Brown"],
  ["234537", "Burnham", "Green"],
  ["D08363", "Burning Sand", "Orange"],
  ["582124", "Burnt Crimson", "Red"],
  ["FF7034", "Burnt Orange", "Orange"],
  ["E97451", "Burnt Sienna", "Brown"],
  ["8A3324", "Burnt Umber", "Brown"],
  ["DA9429", "Buttercup", "Yellow"],
  ["9D702E", "Buttered Rum", "Yellow"],
  ["68578C", "Butterfly Bush", "Violet"],
  ["F6E0A4", "Buttermilk", "Yellow"],
  ["F1EBDA", "Buttery White", "Yellow"],
  ["4A2E32", "Cab Sav", "Red"],
  ["CD526C", "Cabaret", "Red"],
  ["4C5544", "Cabbage Pont", "Green"],
  ["5B6F55", "Cactus", "Green"],
  ["5F9EA0", "Cadet Blue", "Blue"],
  ["984961", "Cadillac", "Red"],
  ["6A4928", "Cafe Royale", "Brown"],
  ["D5B185", "Calico", "Brown"],
  ["E98C3A", "California", "Orange"],
  ["3D7188", "Calypso", "Blue"],
  ["206937", "Camarone", "Green"],
  ["803A4B", "Camelot", "Red"],
  ["CCA483", "Cameo", "Brown"],
  ["4F4D32", "Camouflage", "Yellow"],
  ["78866B", "Camouflage Green", "Green"],
  ["D08A9B", "Can Can", "Red"],
  ["FFFF99", "Canary", "Yellow"],
  ["8E5164", "Cannon Pink", "Red"],
  ["4E5552", "Cape Cod", "Grey"],
  ["FEE0A5", "Cape Honey", "Yellow"],
  ["75482F", "Cape Palliser", "Orange"],
  ["AFC182", "Caper", "Green"],
  ["592720", "Caput Mortuum", "Brown"],
  ["FFD59A", "Caramel", "Yellow"],
  ["EBE5D5", "Cararra", "Green"],
  ["1B3427", "Cardin Green", "Green"],
  ["C41E3A", "Cardinal", "Red"],
  ["C99AA0", "Careys Pink", "Red"],
  ["00CC99", "Caribbean Green", "Green"],
  ["E68095", "Carissma", "Red"],
  ["F5F9CB", "Carla", "Green"],
  ["960018", "Carmine", "Red"],
  ["5B3A24", "Carnaby Tan", "Brown"],
  ["FFA6C9", "Carnation Pink", "Red"],
  ["F8DBE0", "Carousel Pink", "Red"],
  ["ED9121", "Carrot Orange", "Orange"],
  ["F0B253", "Casablanca", "Yellow"],
  ["3F545A", "Casal", "Blue"],
  ["8CA8A0", "Cascade", "Green"],
  ["D1B399", "Cashmere", "Brown"],
  ["AAB5B8", "Casper", "Blue"],
  ["44232F", "Castro", "Red"],
  ["273C5A", "Catalina Blue", "Blue"],
  ["E0E4DC", "Catskill White", "Grey"],
  ["E0B8B1", "Cavern Pink", "Red"],
  ["9271A7", "Ce Soir", "Violet"],
  ["463430", "Cedar", "Brown"],
  ["ACE1AF", "Celadon", "Green"],
  ["B4C04C", "Celery", "Green"],
  ["D2D2C0", "Celeste", "Green"],
  ["3A4E5F", "Cello", "Blue"],
  ["2B3F36", "Celtic", "Green"],
  ["857158", "Cement", "Brown"],
  ["DE3163", "Cerise", "Violet"],
  ["007BA7", "Cerulean", "Blue"],
  ["2A52BE", "Cerulean Blue", "Blue"],
  ["FDE9E0", "Chablis", "Red"],
  ["5A6E41", "Chalet Green", "Green"],
  ["DFC281", "Chalky", "Yellow"],
  ["475877", "Chambray", "Blue"],
  ["E8CD9A", "Chamois", "Yellow"],
  ["EED9B6", "Champagne", "Yellow"],
  ["EDB8C7", "Chantilly", "Red"],
  ["394043", "Charade", "Blue"],
  ["464646", "Charcoal", "Grey"],
  ["F8EADF", "Chardon", "Orange"],
  ["FFC878", "Chardonnay", "Yellow"],
  ["A4DCE6", "Charlotte", "Blue"],
  ["D0748B", "Charm", "Red"],
  ["7FFF00", "Chartreuse", "Green"],
  ["DFFF00", "Chartreuse Yellow", "Yellow"],
  ["419F59", "Chateau Green", "Green"],
  ["B3ABB6", "Chatelle", "Violet"],
  ["2C5971", "Chathams Blue", "Blue"],
  ["88A95B", "Chelsea Cucumber", "Green"],
  ["95532F", "Chelsea Gem", "Orange"],
  ["DEC371", "Chenin", "Yellow"],
  ["F5CD82", "Cherokee", "Yellow"],
  ["372D52", "Cherry Pie", "Violet"],
  ["F5D7DC", "Cherub", "Red"],
  ["B94E48", "Chestnut", "Brown"],
  ["666FB4", "Chetwode Blue", "Blue"],
  ["5B5D56", "Chicago", "Grey"],
  ["F0F5BB", "Chiffon", "Green"],
  ["D05E34", "Chilean Fire", "Orange"],
  ["F9F7DE", "Chilean Heath", "Green"],
  ["FBF3D3", "China Ivory", "Green"],
  ["B8AD8A", "Chino", "Yellow"],
  ["9DD3A8", "Chinook", "Green"],
  ["D2691E", "Chocolate", "Brown"],
  ["382161", "Christalle", "Violet"],
  ["71A91D", "Christi", "Green"],
  ["BF652E", "Christine", "Orange"],
  ["CAC7B7", "Chrome White", "Green"],
  ["7D4E38", "Cigar", "Brown"],
  ["242A2E", "Cinder", "Grey"],
  ["FBD7CC", "Cinderella", "Red"],
  ["E34234", "Cinnabar", "Red"],
  ["5D3B2E", "Cioccolato", "Brown"],
  ["8E9A21", "Citron", "Green"],
  ["9FB70A", "Citrus", "Green"],
  ["D2B3A9", "Clam Shell", "Orange"],
  ["6E2233", "Claret", "Red"],
  ["F4C8DB", "Classic Rose", "Violet"],
  ["897E59", "Clay Creek", "Yellow"],
  ["DFEFEA", "Clear Day", "Green"],
  ["463623", "Clinker", "Brown"],
  ["C2BCB1", "Cloud", "Yellow"],
  ["353E4F", "Cloud Burst", "Blue"],
  ["B0A99F", "Cloudy", "Brown"],
  ["47562F", "Clover", "Green"],
  ["0047AB", "Cobalt", "Blue"],
  ["4F3835", "Cocoa Bean", "Red"],
  ["35281E", "Cocoa Brown", "Brown"],
  ["E1DABB", "Coconut Cream", "Green"],
  ["2D3032", "Cod Grey", "Grey"],
  ["726751", "Coffee", "Yellow"],
  ["362D26", "Coffee Bean", "Brown"],
  ["9A463D", "Cognac", "Red"],
  ["3C2F23", "Cola", "Brown"],
  ["9D8ABF", "Cold Purple", "Violet"],
  ["CAB5B2", "Cold Turkey", "Red"],
  ["9BDDFF", "Columbia Blue", "Blue"],
  ["636373", "Comet", "Blue"],
  ["4C785C", "Como", "Green"],
  ["A0B1AE", "Conch", "Green"],
  ["827F79", "Concord", "Grey"],
  ["D2D1CD", "Concrete", "Grey"],
  ["DDCB46", "Confetti", "Green"],
  ["654D49", "Congo Brown", "Brown"],
  ["B1DD52", "Conifer", "Green"],
  ["C16F68", "Contessa", "Red"],
  ["DA8A67", "Copper", "Red"],
  ["77422C", "Copper Canyon", "Orange"],
  ["996666", "Copper Rose", "Violet"],
  ["95524C", "Copper Rust", "Red"],
  ["FF7F50", "Coral", "Orange"],
  ["F5D0C9", "Coral Candy", "Red"],
  ["FF4040", "Coral Red", "Red"],
  ["AB6E67", "Coral Tree", "Red"],
  ["404D49", "Corduroy", "Green"],
  ["BBB58D", "Coriander", "Green"],
  ["5A4C42", "Cork", "Brown"],
  ["FBEC5D", "Corn", "Yellow"],
  ["F8F3C4", "Corn Field", "Green"],
  ["42426F", "Corn Flower Blue", "Blue"],
  ["8D702A", "Corn Harvest", "Yellow"],
  ["FFF8DC", "Corn Silk", "Yellow"],
  ["93CCEA", "Cornflower", "Blue"],
  ["6495ED", "Cornflower Blue", "Blue"],
  ["E9BA81", "Corvette", "Orange"],
  ["794D60", "Cosmic", "Violet"],
  ["E1F8E7", "Cosmic Latte", "White"],
  ["FCD5CF", "Cosmos", "Red"],
  ["625D2A", "Costa Del Sol", "Green"],
  ["FFB7D5", "Cotton Candy", "Red"],
  ["BFBAAF", "Cotton Seed", "Yellow"],
  ["1B4B35", "County Green", "Green"],
  ["443736", "Cowboy", "Brown"],
  ["87382F", "Crab Apple", "Red"],
  ["A65648", "Crail", "Red"],
  ["DB5079", "Cranberry", "Red"],
  ["4D3E3C", "Crater Brown", "Brown"],
  ["FFFDD0", "Cream", "White"],
  ["FFE39B", "Cream Brulee", "Yellow"],
  ["EEC051", "Cream Can", "Yellow"],
  ["393227", "Creole", "Brown"],
  ["77712B", "Crete", "Green"],
  ["DC143C", "Crimson", "Red"],
  ["706950", "Crocodile", "Yellow"],
  ["763C33", "Crown Of Thorns", "Red"],
  ["B4E2D5", "Cruise", "Green"],
  ["165B31", "Crusoe", "Green"],
  ["F38653", "Crusta", "Orange"],
  ["784430", "Cumin", "Orange"],
  ["F5F4C1", "Cumulus", "Green"],
  ["F5B2C5", "Cupid", "Red"],
  ["3D85B8", "Curious Blue", "Blue"],
  ["5C8173", "Cutty Sark", "Green"],
  ["0F4645", "Cyprus", "Green"],
  ["EDD2A4", "Dairy Cream", "Yellow"],
  ["5B3E90", "Daisy Bush", "Violet"],
  ["664A2D", "Dallas", "Brown"],
  ["FED85D", "Dandelion", "Yellow"],
  ["5B89C0", "Danube", "Blue"],
  ["00008B", "Dark Blue", "Blue"],
  ["654321", "Dark Brown", "Brown"],
  ["08457E", "Dark Cerulean", "Blue"],
  ["986960", "Dark Chestnut", "Red"],
  ["CD5B45", "Dark Coral", "Orange"],
  ["008B8B", "Dark Cyan", "Green"],
  ["B8860B", "Dark Goldenrod", "Yellow"],
  ["A9A9A9", "Dark Gray", "Grey"],
  ["013220", "Dark Green", "Green"],
  ["4A766E", "Dark Green Copper", "Green"],
  ["BDB76B", "Dark Khaki", "Yellow"],
  ["8B008B", "Dark Magenta", "Violet"],
  ["556B2F", "Dark Olive Green", "Green"],
  ["FF8C00", "Dark Orange", "Orange"],
  ["9932CC", "Dark Orchid", "Violet"],
  ["03C03C", "Dark Pastel Green", "Green"],
  ["E75480", "Dark Pink", "Red"],
  ["871F78", "Dark Purple", "Violet"],
  ["8B0000", "Dark Red", "Red"],
  ["45362B", "Dark Rum", "Brown"],
  ["E9967A", "Dark Salmon", "Orange"],
  ["8FBC8F", "Dark Sea Green", "Green"],
  ["465352", "Dark Slate", "Green"],
  ["483D8B", "Dark Slate Blue", "Blue"],
  ["2F4F4F", "Dark Slate Grey", "Grey"],
  ["177245", "Dark Spring Green", "Green"],
  ["97694F", "Dark Tan", "Brown"],
  ["FFA812", "Dark Tangerine", "Orange"],
  ["00CED1", "Dark Turquoise", "Blue"],
  ["9400D3", "Dark Violet", "Violet"],
  ["855E42", "Dark Wood", "Brown"],
  ["788878", "Davy's Grey", "Grey"],
  ["9F9D91", "Dawn", "Green"],
  ["E6D6CD", "Dawn Pink", "Orange"],
  ["85CA87", "De York", "Green"],
  ["CCCF82", "Deco", "Green"],
  ["E36F8A", "Deep Blush", "Red"],
  ["51412D", "Deep Bronze", "Brown"],
  ["DA3287", "Deep Cerise", "Violet"],
  ["193925", "Deep Fir", "Green"],
  ["343467", "Deep Koamaru", "Violet"],
  ["9955BB", "Deep Lilac", "Violet"],
  ["CC00CC", "Deep Magenta", "Violet"],
  ["FF1493", "Deep Pink", "Red"],
  ["167E65", "Deep Sea", "Green"],
  ["00BFFF", "Deep Sky Blue", "Blue"],
  ["19443C", "Deep Teal", "Green"],
  ["B5998E", "Del Rio", "Brown"],
  ["486531", "Dell", "Green"],
  ["999B95", "Delta", "Grey"],
  ["8272A4", "Deluge", "Violet"],
  ["1560BD", "Denim", "Blue"],
  ["F9E4C6", "Derby", "Yellow"],
  ["A15F3B", "Desert", "Orange"],
  ["EDC9AF", "Desert Sand", "Brown"],
  ["EDE7E0", "Desert Storm", "Grey"],
  ["E7F2E9", "Dew", "Green"],
  ["322C2B", "Diesel", "Grey"],
  ["696969", "Dim Gray", "Grey"],
  ["607C47", "Dingley", "Green"],
  ["892D4F", "Disco", "Red"],
  ["CD8431", "Dixie", "Yellow"],
  ["1E90FF", "Dodger Blue", "Blue"],
  ["F5F171", "Dolly", "Green"],
  ["6A6873", "Dolphin", "Violet"],
  ["6C5B4C", "Domino", "Brown"],
  ["5A4F51", "Don Juan", "Brown"],
  ["816E5C", "Donkey Brown", "Brown"],
  ["6E5F56", "Dorado", "Brown"],
  ["E4CF99", "Double Colonial White", "Yellow"],
  ["E9DCBE", "Double Pearl Lusta", "Yellow"],
  ["D2C3A3", "Double Spanish White", "Yellow"],
  ["777672", "Dove Grey", "Grey"],
  ["6FD2BE", "Downy", "Green"],
  ["FBEB9B", "Drover", "Yellow"],
  ["514F4A", "Dune", "Grey"],
  ["E5CAC0", "Dust Storm", "Orange"],
  ["AC9B9B", "Dusty Grey", "Grey"],
  ["F0DFBB", "Dutch White", "Yellow"],
  ["B0AC94", "Eagle", "Green"],
  ["B8A722", "Earls Green", "Green"],
  ["FBF2DB", "Early Dawn", "Yellow"],
  ["47526E", "East Bay", "Blue"],
  ["AA8CBC", "East Side", "Violet"],
  ["00879F", "Eastern Blue", "Blue"],
  ["E6D8D4", "Ebb", "Red"],
  ["313337", "Ebony", "Grey"],
  ["323438", "Ebony Clay", "Grey"],
  ["A4AFCD", "Echo Blue", "Blue"],
  ["3F3939", "Eclipse", "Grey"],
  ["C2B280", "Ecru", "Brown"],
  ["D6D1C0", "Ecru White", "Green"],
  ["C96138", "Ecstasy", "Orange"],
  ["266255", "Eden", "Green"],
  ["C1D8C5", "Edgewater", "Green"],
  ["97A49A", "Edward", "Green"],
  ["F9E4C5", "Egg Sour", "Yellow"],
  ["990066", "Eggplant", "Violet"],
  ["1034A6", "Egyptian Blue", "Blue"],
  ["39392C", "El Paso", "Green"],
  ["8F4E45", "El Salva", "Red"],
  ["7DF9FF", "Electric Blue", "Blue"],
  ["6600FF", "Electric Indigo", "Violet"],
  ["CCFF00", "Electric Lime", "Green"],
  ["BF00FF", "Electric Purple", "Violet"],
  ["243640", "Elephant", "Blue"],
  ["1B8A6B", "Elf Green", "Green"],
  ["297B76", "Elm", "Green"],
  ["50C878", "Emerald", "Green"],
  ["6E3974", "Eminence", "Violet"],
  ["50494A", "Emperor", "Grey"],
  ["7C7173", "Empress", "Grey"],
  ["29598B", "Endeavour", "Blue"],
  ["F5D752", "Energy Yellow", "Yellow"],
  ["274234", "English Holly", "Green"],
  ["8BA58F", "Envy", "Green"],
  ["DAB160", "Equator", "Yellow"],
  ["4E312D", "Espresso", "Red"],
  ["2D2F28", "Eternity", "Green"],
  ["329760", "Eucalyptus", "Green"],
  ["CDA59C", "Eunry", "Red"],
  ["26604F", "Evening Sea", "Green"],
  ["264334", "Everglade", "Green"],
  ["F3E5DC", "Fair Pink", "Orange"],
  ["6E5A5B", "Falcon", "Brown"],
  ["C19A6B", "Fallow", "Brown"],
  ["801818", "Falu Red", "Red"],
  ["F2E6DD", "Fantasy", "Orange"],
  ["625665", "Fedora", "Violet"],
  ["A5D785", "Feijoa", "Green"],
  ["4D5D53", "Feldgrau", "Grey"],
  ["D19275", "Feldspar", "Red"],
  ["63B76C", "Fern", "Green"],
  ["4F7942", "Fern Green", "Green"],
  ["876A68", "Ferra", "Brown"],
  ["EACC4A", "Festival", "Yellow"],
  ["DBE0D0", "Feta", "Green"],
  ["B1592F", "Fiery Orange", "Orange"],
  ["636F22", "Fiji Green", "Green"],
  ["75785A", "Finch", "Green"],
  ["61755B", "Finlandia", "Green"],
  ["694554", "Finn", "Violet"],
  ["4B5A62", "Fiord", "Blue"],
  ["8F3F2A", "Fire", "Orange"],
  ["B22222", "Fire Brick", "Red"],
  ["E09842", "Fire Bush", "Yellow"],
  ["CE1620", "Fire Engine Red", "Red"],
  ["314643", "Firefly", "Green"],
  ["BE5C48", "Flame Pea", "Orange"],
  ["86282E", "Flame Red", "Red"],
  ["EA8645", "Flamenco", "Orange"],
  ["E1634F", "Flamingo", "Orange"],
  ["EEDC82", "Flax", "Yellow"],
  ["716E61", "Flint", "Green"],
  ["7A2E4D", "Flirt", "Red"],
  ["FFFAF0", "Floral White", "White"],
  ["D0EAE8", "Foam", "Green"],
  ["D5C7E8", "Fog", "Violet"],
  ["A7A69D", "Foggy Grey", "Grey"],
  ["228B22", "Forest Green", "Green"],
  ["FDEFDB", "Forget Me Not", "Yellow"],
  ["65ADB2", "Fountain Blue", "Blue"],
  ["FFD7A0", "Frangipani", "Yellow"],
  ["029D74", "Free Speech Aquamarine", "Green"],
  ["4156C5", "Free Speech Blue", "Blue"],
  ["09F911", "Free Speech Green", "Green"],
  ["E35BD8", "Free Speech Magenta", "Red"],
  ["C00000", "Free Speech Red", "Red"],
  ["BFBDC1", "French Grey", "Grey"],
  ["DEB7D9", "French Lilac", "Violet"],
  ["A4D2E0", "French Pass", "Blue"],
  ["F64A8A", "French Rose", "Red"],
  ["86837A", "Friar Grey", "Grey"],
  ["B4E1BB", "Fringy Flower", "Green"],
  ["E56D75", "Froly", "Red"],
  ["E1E4C5", "Frost", "Green"],
  ["E2F2E4", "Frosted Mint", "Green"],
  ["DBE5D2", "Frostee", "Green"],
  ["4BA351", "Fruit Salad", "Green"],
  ["C154C1", "Fuchsia", "Violet"],
  ["FF77FF", "Fuchsia Pink", "Red"],
  ["C2D62E", "Fuego", "Green"],
  ["D19033", "Fuel Yellow", "Yellow"],
  ["335083", "Fun Blue", "Blue"],
  ["15633D", "Fun Green", "Green"],
  ["3C3B3C", "Fuscous Grey", "Grey"],
  ["C45655", "Fuzzy Wuzzy Brown", "Brown"],
  ["2C4641", "Gable Green", "Green"],
  ["DCDCDC", "Gainsboro", "White"],
  ["DCD7D1", "Gallery", "Grey"],
  ["D8A723", "Galliano", "Yellow"],
  ["E49B0F", "Gamboge", "Yellow"],
  ["C5832E", "Geebung", "Yellow"],
  ["31796D", "Genoa", "Green"],
  ["E77B75", "Geraldine", "Red"],
  ["CBD0CF", "Geyser", "Grey"],
  ["C0BFC7", "Ghost", "Blue"],
  ["F8F8FF", "Ghost White", "White"],
  ["564786", "Gigas", "Violet"],
  ["B9AD61", "Gimblet", "Green"],
  ["D9DFCD", "Gin", "Green"],
  ["F8EACA", "Gin Fizz", "Yellow"],
  ["EBD4AE", "Givry", "Yellow"],
  ["78B1BF", "Glacier", "Blue"],
  ["5F8151", "Glade Green", "Green"],
  ["786E4C", "Go Ben", "Yellow"],
  ["34533D", "Goblin", "Green"],
  ["FFD700", "Gold", "Yellow"],
  ["D56C30", "Gold Drop", "Orange"],
  ["E2B227", "Gold Tips", "Yellow"],
  ["CA8136", "Golden Bell", "Orange"],
  ["996515", "Golden Brown", "Brown"],
  ["F1CC2B", "Golden Dream", "Yellow"],
  ["EBDE31", "Golden Fizz", "Green"],
  ["F9D77E", "Golden Glow", "Yellow"],
  ["FCC200", "Golden Poppy", "Yellow"],
  ["EACE6A", "Golden Sand", "Yellow"],
  ["FFC152", "Golden Tainoi", "Yellow"],
  ["FFDF00", "Golden Yellow", "Yellow"],
  ["DBDB70", "Goldenrod", "Yellow"],
  ["373332", "Gondola", "Grey"],
  ["29332B", "Gordons Green", "Green"],
  ["FDE336", "Gorse", "Green"],
  ["399F86", "Gossamer", "Green"],
  ["9FD385", "Gossip", "Green"],
  ["698890", "Gothic", "Blue"],
  ["51559B", "Governor Bay", "Blue"],
  ["CAB8A2", "Grain Brown", "Yellow"],
  ["FFCD73", "Grandis", "Yellow"],
  ["8B8265", "Granite Green", "Yellow"],
  ["C5E7CD", "Granny Apple", "Green"],
  ["7B948C", "Granny Smith", "Green"],
  ["9DE093", "Granny Smith Apple", "Green"],
  ["413D4B", "Grape", "Violet"],
  ["383428", "Graphite", "Yellow"],
  ["4A4B46", "Gravel", "Grey"],
  ["008000", "Green", "Green"],
  ["3E6334", "Green House", "Green"],
  ["393D2A", "Green Kelp", "Green"],
  ["526B2D", "Green Leaf", "Green"],
  ["BFC298", "Green Mist", "Green"],
  ["266242", "Green Pea", "Green"],
  ["9CA664", "Green Smoke", "Green"],
  ["A9AF99", "Green Spring", "Green"],
  ["23414E", "Green Vogue", "Blue"],
  ["2C2D24", "Green Waterloo", "Green"],
  ["DEDDCB", "Green White", "Green"],
  ["ADFF2F", "Green Yellow", "Green"],
  ["C14D36", "Grenadier", "Orange"],
  ["808080", "Grey", "Grey"],
  ["9FA3A7", "Grey Chateau", "Grey"],
  ["BDBAAE", "Grey Nickel", "Green"],
  ["D1D3CC", "Grey Nurse", "Grey"],
  ["A19A7F", "Grey Olive", "Yellow"],
  ["9391A0", "Grey Suit", "Blue"],
  ["465945", "Grey-Asparagus", "Green"],
  ["952E31", "Guardsman Red", "Red"],
  ["343F5C", "Gulf Blue", "Blue"],
  ["74B2A8", "Gulf Stream", "Green"],
  ["A4ADB0", "Gull Grey", "Grey"],
  ["ACC9B2", "Gum Leaf", "Green"],
  ["718F8A", "Gumbo", "Green"],
  ["484753", "Gun Powder", "Violet"],
  ["2C3539", "Gunmetal", "Blue"],
  ["7A7C76", "Gunsmoke", "Grey"],
  ["989171", "Gurkha", "Green"],
  ["9E8022", "Hacienda", "Yellow"],
  ["633528", "Hairy Heath", "Brown"],
  ["2C2A35", "Haiti", "Violet"],
  ["EDE7C8", "Half And Half", "Green"],
  ["558F93", "Half Baked", "Blue"],
  ["F2E5BF", "Half Colonial White", "Yellow"],
  ["FBF0D6", "Half Dutch White", "Yellow"],
  ["F1EAD7", "Half Pearl Lusta", "Yellow"],
  ["E6DBC7", "Half Spanish White", "Yellow"],
  ["E8D4A2", "Hampton", "Yellow"],
  ["5218FA", "Han Purple", "Violet"],
  ["3FFF00", "Harlequin", "Green"],
  ["C93413", "Harley Davidson Orange", "Orange"],
  ["CBCEC0", "Harp", "Green"],
  ["EAB76A", "Harvest Gold", "Yellow"],
  ["3B2B2C", "Havana", "Brown"],
  ["5784C1", "Havelock Blue", "Blue"],
  ["99522B", "Hawaiian Tan", "Orange"],
  ["D2DAED", "Hawkes Blue", "Blue"],
  ["4F2A2C", "Heath", "Red"],
  ["AEBBC1", "Heather", "Blue"],
  ["948C7E", "Heathered Grey", "Brown"],
  ["46473E", "Heavy Metal", "Grey"],
  ["DF73FF", "Heliotrope", "Violet"],
  ["69684B", "Hemlock", "Yellow"],
  ["987D73", "Hemp", "Brown"],
  ["928C3C", "Highball", "Green"],
  ["7A9461", "Highland", "Green"],
  ["A7A07E", "Hillary", "Green"],
  ["736330", "Himalaya", "Yellow"],
  ["DFF1D6", "Hint Of Green", "Green"],
  ["F5EFEB", "Hint Of Red", "Grey"],
  ["F6F5D7", "Hint Of Yellow", "Green"],
  ["49889A", "Hippie Blue", "Blue"],
  ["608A5A", "Hippie Green", "Green"],
  ["AB495C", "Hippie Pink", "Red"],
  ["A1A9A8", "Hit Grey", "Grey"],
  ["FDA470", "Hit Pink", "Orange"],
  ["BB8E34", "Hokey Pokey", "Yellow"],
  ["647D86", "Hoki", "Blue"],
  ["25342B", "Holly", "Green"],
  ["F400A1", "Hollywood Cerise", "Red"],
  ["5C3C6D", "Honey Flower", "Violet"],
  ["F0FFF0", "Honeydew", "White"],
  ["E8ED69", "Honeysuckle", "Green"],
  ["CD6D93", "Hopbush", "Violet"],
  ["648894", "Horizon", "Blue"],
  ["6D562C", "Horses Neck", "Yellow"],
  ["815B28", "Hot Curry", "Yellow"],
  ["FF00CC", "Hot Magenta", "Red"],
  ["FF69B4", "Hot Pink", "Red"],
  ["4E2E53", "Hot Purple", "Violet"],
  ["A7752C", "Hot Toddy", "Yellow"],
  ["CEEFE4", "Humming Bird", "Green"],
  ["355E3B", "Hunter Green", "Green"],
  ["8B7E77", "Hurricane", "Brown"],
  ["B2994B", "Husk", "Yellow"],
  ["AFE3D6", "Ice Cold", "Green"],
  ["CAE1D9", "Iceberg", "Green"],
  ["EF95AE", "Illusion", "Red"],
  ["B0E313", "Inch Worm", "Green"],
  ["CD5C5C", "Indian Red", "Red"],
  ["4F301F", "Indian Tan", "Brown"],
  ["4B0082", "Indigo", "Violet"],
  ["9C5B34", "Indochine", "Orange"],
  ["002FA7", "International Klein Blue", "Blue"],
  ["FF4F00", "International Orange", "Orange"],
  ["03B4C8", "Iris Blue", "Blue"],
  ["62422B", "Irish Coffee", "Brown"],
  ["CBCDCD", "Iron", "Grey"],
  ["706E66", "Ironside Grey", "Grey"],
  ["865040", "Ironstone", "Brown"],
  ["009900", "Islamic Green", "Green"],
  ["F8EDDB", "Island Spice", "Yellow"],
  ["FFFFF0", "Ivory", "White"],
  ["3D325D", "Jacarta", "Violet"],
  ["413628", "Jacko Bean", "Brown"],
  ["3D3F7D", "Jacksons Purple", "Violet"],
  ["00A86B", "Jade", "Green"],
  ["E27945", "Jaffa", "Orange"],
  ["CAE7E2", "Jagged Ice", "Green"],
  ["3F2E4C", "Jagger", "Violet"],
  ["29292F", "Jaguar", "Blue"],
  ["674834", "Jambalaya", "Brown"],
  ["2F7532", "Japanese Laurel", "Green"],
  ["CE7259", "Japonica", "Orange"],
  ["259797", "Java", "Green"],
  ["5F2C2F", "Jazz", "Red"],
  ["A50B5E", "Jazzberry Jam", "Red"],
  ["44798E", "Jelly Bean", "Blue"],
  ["BBD0C9", "Jet Stream", "Green"],
  ["136843", "Jewel", "Green"],
  ["463D3E", "Jon", "Grey"],
  ["EEF293", "Jonquil", "Green"],
  ["7AAAE0", "Jordy Blue", "Blue"],
  ["5D5346", "Judge Grey", "Brown"],
  ["878785", "Jumbo", "Grey"],
  ["29AB87", "Jungle Green", "Green"],
  ["B0C4C4", "Jungle Mist", "Green"],
  ["74918E", "Juniper", "Green"],
  ["DCBFAC", "Just Right", "Orange"],
  ["6C5E53", "Kabul", "Brown"],
  ["245336", "Kaitoke Green", "Green"],
  ["C5C3B0", "Kangaroo", "Green"],
  ["2D2D24", "Karaka", "Green"],
  ["FEDCC1", "Karry", "Orange"],
  ["576D8E", "Kashmir Blue", "Blue"],
  ["4CBB17", "Kelly Green", "Green"],
  ["4D503C", "Kelp", "Green"],
  ["6C322E", "Kenyan Copper", "Red"],
  ["5FB69C", "Keppel", "Green"],
  ["F0E68C", "Khaki", "Yellow"],
  ["BFC0AB", "Kidnapper", "Green"],
  ["3A3532", "Kilamanjaro", "Grey"],
  ["49764F", "Killarney", "Green"],
  ["695D87", "Kimberly", "Violet"],
  ["583580", "Kingfisher Daisy", "Violet"],
  ["E093AB", "Kobi", "Red"],
  ["7B785A", "Kokoda", "Green"],
  ["804E2C", "Korma", "Orange"],
  ["FEB552", "Koromiko", "Yellow"],
  ["F9D054", "Kournikova", "Yellow"],
  ["428929", "La Palma", "Green"],
  ["BAC00E", "La Rioja", "Green"],
  ["C6DA36", "Las Palmas", "Green"],
  ["C6A95E", "Laser", "Yellow"],
  ["FFFF66", "Laser Lemon", "Yellow"],
  ["6E8D71", "Laurel", "Green"],
  ["E6E6FA", "Lavender", "Violet"],
  ["CCCCFF", "Lavender Blue", "Blue"],
  ["FFF0F5", "Lavender Blush", "Violet"],
  ["BDBBD7", "Lavender Grey", "Grey"],
  ["FBAED2", "Lavender Pink", "Red"],
  ["FBA0E3", "Lavender Rose", "Red"],
  ["7CFC00", "Lawn Green", "Green"],
  ["906A54", "Leather", "Brown"],
  ["FDE910", "Lemon", "Yellow"],
  ["FFFACD", "Lemon Chiffon", "Yellow"],
  ["968428", "Lemon Ginger", "Yellow"],
  ["999A86", "Lemon Grass", "Green"],
  ["2E3749", "Licorice", "Blue"],
  ["ADD8E6", "Light Blue", "Blue"],
  ["F08080", "Light Coral", "Orange"],
  ["E0FFFF", "Light Cyan", "Blue"],
  ["EEDD82", "Light Goldenrod", "Yellow"],
  ["FAFAD2", "Light Goldenrod Yellow", "Yellow"],
  ["90EE90", "Light Green", "Green"],
  ["D3D3D3", "Light Grey", "Grey"],
  ["FFB6C1", "Light Pink", "Red"],
  ["FFA07A", "Light Salmon", "Orange"],
  ["20B2AA", "Light Sea Green", "Green"],
  ["87CEFA", "Light Sky Blue", "Blue"],
  ["8470FF", "Light Slate Blue", "Blue"],
  ["778899", "Light Slate Grey", "Grey"],
  ["B0C4DE", "Light Steel Blue", "Blue"],
  ["856363", "Light Wood", "Brown"],
  ["FFFFE0", "Light Yellow", "Yellow"],
  ["F7A233", "Lightning Yellow", "Yellow"],
  ["C8A2C8", "Lilac", "Violet"],
  ["9470C4", "Lilac Bush", "Violet"],
  ["C19FB3", "Lily", "Violet"],
  ["E9EEEB", "Lily White", "Grey"],
  ["7AAC21", "Lima", "Green"],
  ["00FF00", "Lime", "Green"],
  ["32CD32", "Lime Green", "Green"],
  ["5F9727", "Limeade", "Green"],
  ["89AC27", "Limerick", "Green"],
  ["FAF0E6", "Linen", "White"],
  ["C7CDD8", "Link Water", "Blue"],
  ["962C54", "Lipstick", "Red"],
  ["534B4F", "Liver", "Brown"],
  ["312A29", "Livid Brown", "Brown"],
  ["DBD9C2", "Loafer", "Green"],
  ["B3BBB7", "Loblolly", "Green"],
  ["489084", "Lochinvar", "Green"],
  ["316EA0", "Lochmara", "Blue"],
  ["A2A580", "Locust", "Green"],
  ["393E2E", "Log Cabin", "Green"],
  ["9D9CB4", "Logan", "Blue"],
  ["B9ACBB", "Lola", "Violet"],
  ["AE94AB", "London Hue", "Violet"],
  ["522426", "Lonestar", "Red"],
  ["8B504B", "Lotus", "Brown"],
  ["4C3347", "Loulou", "Violet"],
  ["AB9A1C", "Lucky", "Green"],
  ["292D4F", "Lucky Point", "Blue"],
  ["4E5541", "Lunar Green", "Green"],
  ["782E2C", "Lusty", "Red"],
  ["AB8D3F", "Luxor Gold", "Yellow"],
  ["697D89", "Lynch", "Blue"],
  ["CBE8E8", "Mabel", "Blue"],
  ["FFB97B", "Macaroni And Cheese", "Orange"],
  ["B7E3A8", "Madang", "Green"],
  ["2D3C54", "Madison", "Blue"],
  ["473E23", "Madras", "Brown"],
  ["FF00FF", "Magenta", "Violet"],
  ["AAF0D1", "Magic Mint", "Green"],
  ["F8F4FF", "Magnolia", "White"],
  ["CA3435", "Mahogany", "Brown"],
  ["A56531", "Mai Tai", "Orange"],
  ["2A2922", "Maire", "Yellow"],
  ["E3B982", "Maize", "Yellow"],
  ["695F50", "Makara", "Brown"],
  ["505555", "Mako", "Grey"],
  ["0BDA51", "Malachite", "Green"],
  ["97976F", "Malachite Green", "Green"],
  ["66B7E1", "Malibu", "Blue"],
  ["3A4531", "Mallard", "Green"],
  ["A59784", "Malta", "Brown"],
  ["766D7C", "Mamba", "Violet"],
  ["8D90A1", "Manatee", "Blue"],
  ["B57B2E", "Mandalay", "Yellow"],
  ["8E2323", "Mandarian Orange", "Orange"],
  ["CD525B", "Mandy", "Red"],
  ["F5B799", "Mandys Pink", "Orange"],
  ["E77200", "Mango Tango", "Orange"],
  ["E2AF80", "Manhattan", "Orange"],
  ["7FC15C", "Mantis", "Green"],
  ["96A793", "Mantle", "Green"],
  ["E4DB55", "Manz", "Green"],
  ["352235", "Mardi Gras", "Violet"],
  ["B88A3D", "Marigold", "Yellow"],
  ["42639F", "Mariner", "Blue"],
  ["800000", "Maroon", "Brown"],
  ["2B2E26", "Marshland", "Green"],
  ["B7A8A3", "Martini", "Brown"],
  ["3C3748", "Martinique", "Violet"],
  ["EBC881", "Marzipan", "Yellow"],
  ["57534B", "Masala", "Brown"],
  ["365C7D", "Matisse", "Blue"],
  ["8E4D45", "Matrix", "Red"],
  ["524B4B", "Matterhorn", "Grey"],
  ["E0B0FF", "Mauve", "Violet"],
  ["915F6D", "Mauve Taupe", "Red"],
  ["F091A9", "Mauvelous", "Red"],
  ["C8B1C0", "Maverick", "Violet"],
  ["73C2FB", "Maya Blue", "Blue"],
  ["8C6338", "McKenzie", "Orange"],
  ["66CDAA", "Medium Aquamarine", "Blue"],
  ["0000CD", "Medium Blue", "Blue"],
  ["AF4035", "Medium Carmine", "Red"],
  ["EAEAAE", "Medium Goldenrod", "Yellow"],
  ["BA55D3", "Medium Orchid", "Violet"],
  ["9370DB", "Medium Purple", "Violet"],
  ["3CB371", "Medium Sea Green", "Green"],
  ["7B68EE", "Medium Slate Blue", "Blue"],
  ["00FA9A", "Medium Spring Green", "Green"],
  ["48D1CC", "Medium Turquoise", "Blue"],
  ["C71585", "Medium Violet Red", "Red"],
  ["A68064", "Medium Wood", "Brown"],
  ["E0B7C2", "Melanie", "Red"],
  ["342931", "Melanzane", "Violet"],
  ["FEBAAD", "Melon", "Red"],
  ["C3B9DD", "Melrose", "Violet"],
  ["D5D2D1", "Mercury", "Grey"],
  ["E1DBD0", "Merino", "Yellow"],
  ["4F4E48", "Merlin", "Grey"],
  ["73343A", "Merlot", "Red"],
  ["554A3C", "Metallic Bronze", "Red"],
  ["6E3D34", "Metallic Copper", "Red"],
  ["D4AF37", "Metallic Gold", "Yellow"],
  ["BB7431", "Meteor", "Orange"],
  ["4A3B6A", "Meteorite", "Violet"],
  ["9B3D3D", "Mexican Red", "Red"],
  ["666A6D", "Mid Grey", "Grey"],
  ["21303E", "Midnight", "Blue"],
  ["191970", "Midnight Blue", "Blue"],
  ["21263A", "Midnight Express", "Blue"],
  ["242E28", "Midnight Moss", "Green"],
  ["3F3623", "Mikado", "Brown"],
  ["F6F493", "Milan", "Green"],
  ["9E3332", "Milano Red", "Red"],
  ["F3E5C0", "Milk Punch", "Yellow"],
  ["DCD9CD", "Milk White", "Grey"],
  ["595648", "Millbrook", "Brown"],
  ["F5F5CC", "Mimosa", "Green"],
  ["DAEA6F", "Mindaro", "Green"],
  ["373E41", "Mine Shaft", "Blue"],
  ["506355", "Mineral Green", "Green"],
  ["407577", "Ming", "Green"],
  ["3E3267", "Minsk", "Violet"],
  ["F5FFFA", "Mint Cream", "White"],
  ["98FF98", "Mint Green", "Green"],
  ["E0D8A7", "Mint Julep", "Green"],
  ["C6EADD", "Mint Tulip", "Green"],
  ["373F43", "Mirage", "Blue"],
  ["A5A9B2", "Mischka", "Blue"],
  ["BAB9A9", "Mist Grey", "Grey"],
  ["FFE4E1", "Misty Rose", "Violet"],
  ["605A67", "Mobster", "Violet"],
  ["582F2B", "Moccaccino", "Red"],
  ["FFE4B5", "Moccasin", "Yellow"],
  ["6F372D", "Mocha", "Red"],
  ["97463C", "Mojo", "Red"],
  ["FF9889", "Mona Lisa", "Red"],
  ["6B252C", "Monarch", "Red"],
  ["554D42", "Mondo", "Brown"],
  ["A58B6F", "Mongoose", "Brown"],
  ["7A7679", "Monsoon", "Grey"],
  ["393B3C", "Montana", "Grey"],
  ["7AC5B4", "Monte Carlo", "Green"],
  ["8378C7", "Moody Blue", "Violet"],
  ["F5F3CE", "Moon Glow", "Green"],
  ["CECDB8", "Moon Mist", "Green"],
  ["C0B2D7", "Moon Raker", "Violet"],
  ["F0C420", "Moon Yellow", "Yellow"],
  ["9ED1D3", "Morning Glory", "Blue"],
  ["442D21", "Morocco Brown", "Brown"],
  ["565051", "Mortar", "Grey"],
  ["005F5B", "Mosque", "Green"],
  ["ADDFAD", "Moss Green", "Green"],
  ["1AB385", "Mountain Meadow", "Green"],
  ["A09F9C", "Mountain Mist", "Grey"],
  ["997A8D", "Mountbatten Pink", "Violet"],
  ["A9844F", "Muddy Waters", "Yellow"],
  ["9E7E53", "Muesli", "Brown"],
  ["C54B8C", "Mulberry", "Violet"],
  ["884F40", "Mule Fawn", "Brown"],
  ["524D5B", "Mulled Wine", "Violet"],
  ["FFDB58", "Mustard", "Yellow"],
  ["D68B80", "My Pink", "Red"],
  ["FDAE45", "My Sin", "Yellow"],
  ["21421E", "Myrtle", "Green"],
  ["D8DDDA", "Mystic", "Grey"],
  ["4E5D4E", "Nandor", "Green"],
  ["A39A87", "Napa", "Yellow"],
  ["E9E6DC", "Narvik", "Green"],
  ["FFDEAD", "Navajo White", "Brown"],
  ["000080", "Navy", "Blue"],
  ["0066CC", "Navy Blue", "Blue"],
  ["B8C6BE", "Nebula", "Green"],
  ["EEC7A2", "Negroni", "Orange"],
  ["4D4DFF", "Neon Blue", "Blue"],
  ["FF9933", "Neon Carrot", "Orange"],
  ["FF6EC7", "Neon Pink", "Violet"],
  ["93AAB9", "Nepal", "Blue"],
  ["77A8AB", "Neptune", "Green"],
  ["252525", "Nero", "Grey"],
  ["AAA583", "Neutral Green", "Green"],
  ["666F6F", "Nevada", "Grey"],
  ["6D3B24", "New Amber", "Orange"],
  ["00009C", "New Midnight Blue", "Blue"],
  ["E4C385", "New Orleans", "Yellow"],
  ["EBC79E", "New Tan", "Brown"],
  ["DD8374", "New York Pink", "Red"],
  ["29A98B", "Niagara", "Green"],
  ["332E2E", "Night Rider", "Grey"],
  ["A23D54", "Night Shadz", "Red"],
  ["253F4E", "Nile Blue", "Blue"],
  ["A99D9D", "Nobel", "Grey"],
  ["A19986", "Nomad", "Yellow"],
  ["1D393C", "Nordic", "Blue"],
  ["A4B88F", "Norway", "Green"],
  ["BC9229", "Nugget", "Yellow"],
  ["7E4A3B", "Nutmeg", "Brown"],
  ["FCEDC5", "Oasis", "Yellow"],
  ["008F70", "Observatory", "Green"],
  ["4CA973", "Ocean Green", "Green"],
  ["CC7722", "Ochre", "Brown"],
  ["DFF0E2", "Off Green", "Green"],
  ["FAF3DC", "Off Yellow", "Yellow"],
  ["313330", "Oil", "Grey"],
  ["8A3335", "Old Brick", "Red"],
  ["73503B", "Old Copper", "Red"],
  ["CFB53B", "Old Gold", "Yellow"],
  ["FDF5E6", "Old Lace", "White"],
  ["796878", "Old Lavender", "Violet"],
  ["C02E4C", "Old Rose", "Red"],
  ["808000", "Olive", "Green"],
  ["6B8E23", "Olive Drab", "Green"],
  ["B5B35C", "Olive Green", "Green"],
  ["888064", "Olive Haze", "Yellow"],
  ["747028", "Olivetone", "Green"],
  ["9AB973", "Olivine", "Orange"],
  ["C2E6EC", "Onahau", "Blue"],
  ["48412B", "Onion", "Yellow"],
  ["A8C3BC", "Opal", "Green"],
  ["987E7E", "Opium", "Brown"],
  ["395555", "Oracle", "Green"],
  ["FFA500", "Orange", "Orange"],
  ["FFA000", "Orange Peel", "Orange"],
  ["FF4500", "Orange Red", "Orange"],
  ["A85335", "Orange Roughy", "Orange"],
  ["EAE3CD", "Orange White", "Yellow"],
  ["DA70D6", "Orchid", "Violet"],
  ["F1EBD9", "Orchid White", "Yellow"],
  ["255B77", "Orient", "Blue"],
  ["C28E88", "Oriental Pink", "Red"],
  ["D2D3B3", "Orinoco", "Green"],
  ["818988", "Oslo Grey", "Grey"],
  ["D3DBCB", "Ottoman", "Green"],
  ["2D383A", "Outer Space", "Grey"],
  ["FF6037", "Outrageous Orange", "Orange"],
  ["28353A", "Oxford Blue", "Blue"],
  ["6D9A78", "Oxley", "Green"],
  ["D1EAEA", "Oyster Bay", "Blue"],
  ["D4B5B0", "Oyster Pink", "Red"],
  ["864B36", "Paarl", "Orange"],
  ["7A715C", "Pablo", "Yellow"],
  ["009DC4", "Pacific Blue", "Blue"],
  ["4F4037", "Paco", "Brown"],
  ["7EB394", "Padua", "Green"],
  ["682860", "Palatinate Purple", "Violet"],
  ["987654", "Pale Brown", "Brown"],
  ["DDADAF", "Pale Chestnut", "Red"],
  ["ABCDEF", "Pale Cornflower Blue", "Blue"],
  ["EEE8AA", "Pale Goldenrod", "Yellow"],
  ["98FB98", "Pale Green", "Green"],
  ["BDCAA8", "Pale Leaf", "Green"],
  ["F984E5", "Pale Magenta", "Violet"],
  ["9C8D72", "Pale Oyster", "Brown"],
  ["FADADD", "Pale Pink", "Red"],
  ["F9F59F", "Pale Prim", "Green"],
  ["EFD6DA", "Pale Rose", "Red"],
  ["636D70", "Pale Sky", "Blue"],
  ["C3BEBB", "Pale Slate", "Grey"],
  ["BC987E", "Pale Taupe", "Grey"],
  ["AFEEEE", "Pale Turquoise", "Blue"],
  ["DB7093", "Pale Violet Red", "Red"],
  ["20392C", "Palm Green", "Green"],
  ["36482F", "Palm Leaf", "Green"],
  ["EAE4DC", "Pampas", "Grey"],
  ["EBF7E4", "Panache", "Green"],
  ["DFB992", "Pancho", "Orange"],
  ["544F3A", "Panda", "Yellow"],
  ["FFEFD5", "Papaya Whip", "Yellow"],
  ["7C2D37", "Paprika", "Red"],
  ["488084", "Paradiso", "Green"],
  ["D0C8B0", "Parchment", "Yellow"],
  ["FBEB50", "Paris Daisy", "Green"],
  ["312760", "Paris M", "Violet"],
  ["BFCDC0", "Paris White", "Green"],
  ["305D35", "Parsley", "Green"],
  ["77DD77", "Pastel Green", "Green"],
  ["639283", "Patina", "Green"],
  ["D3E5EF", "Pattens Blue", "Blue"],
  ["2A2551", "Paua", "Violet"],
  ["BAAB87", "Pavlova", "Yellow"],
  ["404048", "Payne's Grey", "Grey"],
  ["FFCBA4", "Peach", "Orange"],
  ["FFDAB9", "Peach Puff", "Yellow"],
  ["FFCC99", "Peach-Orange", "Orange"],
  ["FADFAD", "Peach-Yellow", "Yellow"],
  ["7A4434", "Peanut", "Brown"],
  ["D1E231", "Pear", "Yellow"],
  ["DED1C6", "Pearl Bush", "Orange"],
  ["EAE0C8", "Pearl Lusta", "Yellow"],
  ["766D52", "Peat", "Yellow"],
  ["2599B2", "Pelorous", "Blue"],
  ["D7E7D0", "Peppermint", "Green"],
  ["ACB9E8", "Perano", "Blue"],
  ["C2A9DB", "Perfume", "Violet"],
  ["ACB6B2", "Periglacial Blue", "Green"],
  ["C3CDE6", "Periwinkle", "Blue"],
  ["1C39BB", "Persian Blue", "Blue"],
  ["00A693", "Persian Green", "Green"],
  ["32127A", "Persian Indigo", "Violet"],
  ["F77FBE", "Persian Pink", "Red"],
  ["683332", "Persian Plum", "Red"],
  ["CC3333", "Persian Red", "Red"],
  ["FE28A2", "Persian Rose", "Red"],
  ["EC5800", "Persimmon", "Red"],
  ["CD853F", "Peru", "Brown"],
  ["733D1F", "Peru Tan", "Orange"],
  ["7A7229", "Pesto", "Yellow"],
  ["DA9790", "Petite Orchid", "Red"],
  ["91A092", "Pewter", "Green"],
  ["826663", "Pharlap", "Brown"],
  ["F8EA97", "Picasso", "Green"],
  ["5BA0D0", "Picton Blue", "Blue"],
  ["FDD7E4", "Pig Pink", "Red"],
  ["00A550", "Pigment Green", "Green"],
  ["756556", "Pine Cone", "Brown"],
  ["BDC07E", "Pine Glade", "Green"],
  ["01796F", "Pine Green", "Green"],
  ["2A2F23", "Pine Tree", "Green"],
  ["FFC0CB", "Pink", "Red"],
  ["FF66FF", "Pink Flamingo", "Red"],
  ["D8B4B6", "Pink Flare", "Red"],
  ["F6CCD7", "Pink Lace", "Red"],
  ["F3D7B6", "Pink Lady", "Orange"],
  ["BFB3B2", "Pink Swan", "Grey"],
  ["9D5432", "Piper", "Orange"],
  ["F5E6C4", "Pipi", "Yellow"],
  ["FCDBD2", "Pippin", "Red"],
  ["BA782A", "Pirate Gold", "Yellow"],
  ["BBCDA5", "Pixie Green", "Green"],
  ["E57F3D", "Pizazz", "Orange"],
  ["BF8D3C", "Pizza", "Yellow"],
  ["3E594C", "Plantation", "Green"],
  ["DDA0DD", "Plum", "Violet"],
  ["651C26", "Pohutukawa", "Red"],
  ["E5F2E7", "Polar", "Green"],
  ["8AA7CC", "Polo Blue", "Blue"],
  ["6A1F44", "Pompadour", "Violet"],
  ["DDDCDB", "Porcelain", "Grey"],
  ["DF9D5B", "Porsche", "Orange"],
  ["3B436C", "Port Gore", "Blue"],
  ["F4F09B", "Portafino", "Green"],
  ["8B98D8", "Portage", "Blue"],
  ["F0D555", "Portica", "Yellow"],
  ["EFDCD4", "Pot Pourri", "Orange"],
  ["845C40", "Potters Clay", "Brown"],
  ["B0E0E6", "Powder Blue", "Blue"],
  ["883C32", "Prairie Sand", "Red"],
  ["CAB4D4", "Prelude", "Violet"],
  ["E2CDD5", "Prim", "Violet"],
  ["E4DE8E", "Primrose", "Green"],
  ["F8F6DF", "Promenade", "Green"],
  ["F6E3DA", "Provincial Pink", "Orange"],
  ["003366", "Prussian Blue", "Blue"],
  ["DD00FF", "Psychedelic Purple", "Violet"],
  ["CC8899", "Puce", "Red"],
  ["6E3326", "Pueblo", "Orange"],
  ["59BAA3", "Puerto Rico", "Green"],
  ["BAC0B4", "Pumice", "Green"],
  ["FF7518", "Pumpkin", "Orange"],
  ["534931", "Punga", "Yellow"],
  ["800080", "Purple", "Violet"],
  ["652DC1", "Purple Heart", "Violet"],
  ["9678B6", "Purple Mountain's Majesty", "Violet"],
  ["50404D", "Purple Taupe", "Grey"],
  ["CDAE70", "Putty", "Yellow"],
  ["F2EDDD", "Quarter Pearl Lusta", "Green"],
  ["EBE2D2", "Quarter Spanish White", "Yellow"],
  ["D9D9F3", "Quartz", "White"],
  ["C3988B", "Quicksand", "Brown"],
  ["CBC9C0", "Quill Grey", "Grey"],
  ["6A5445", "Quincy", "Brown"],
  ["232F2C", "Racing Green", "Green"],
  ["FF355E", "Radical Red", "Red"],
  ["DCC6A0", "Raffia", "Yellow"],
  ["667028", "Rain Forest", "Green"],
  ["B3C1B1", "Rainee", "Green"],
  ["FCAE60", "Rajah", "Orange"],
  ["2B2E25", "Rangoon Green", "Green"],
  ["6F747B", "Raven", "Blue"],
  ["D27D46", "Raw Sienna", "Brown"],
  ["734A12", "Raw Umber", "Brown"],
  ["FF33CC", "Razzle Dazzle Rose", "Red"],
  ["E30B5C", "Razzmatazz", "Red"],
  ["453430", "Rebel", "Brown"],
  ["FF0000", "Red", "Red"],
  ["701F28", "Red Berry", "Red"],
  ["CB6F4A", "Red Damask", "Orange"],
  ["662A2C", "Red Devil", "Red"],
  ["FF3F34", "Red Orange", "Orange"],
  ["5D1F1E", "Red Oxide", "Red"],
  ["7D4138", "Red Robin", "Red"],
  ["AD522E", "Red Stage", "Orange"],
  ["BB3385", "Medium Red Violet", "Violet"],
  ["5B342E", "Redwood", "Red"],
  ["D1EF9F", "Reef", "Green"],
  ["A98D36", "Reef Gold", "Yellow"],
  ["203F58", "Regal Blue", "Blue"],
  ["798488", "Regent Grey", "Blue"],
  ["A0CDD9", "Regent St Blue", "Blue"],
  ["F6DEDA", "Remy", "Red"],
  ["B26E33", "Reno Sand", "Orange"],
  ["323F75", "Resolution Blue", "Blue"],
  ["37363F", "Revolver", "Violet"],
  ["3D4653", "Rhino", "Blue"],
  ["EFECDE", "Rice Cake", "Green"],
  ["EFF5D1", "Rice Flower", "Green"],
  ["5959AB", "Rich Blue", "Blue"],
  ["A15226", "Rich Gold", "Orange"],
  ["B7C61A", "Rio Grande", "Green"],
  ["89D9C8", "Riptide", "Green"],
  ["556061", "River Bed", "Blue"],
  ["DDAD56", "Rob Roy", "Yellow"],
  ["00CCCC", "Robin's Egg Blue", "Blue"],
  ["5A4D41", "Rock", "Brown"],
  ["93A2BA", "Rock Blue", "Blue"],
  ["9D442D", "Rock Spray", "Orange"],
  ["C7A384", "Rodeo Dust", "Brown"],
  ["6D7876", "Rolling Stone", "Green"],
  ["D8625B", "Roman", "Red"],
  ["7D6757", "Roman Coffee", "Brown"],
  ["F4F0E6", "Romance", "Grey"],
  ["FFC69E", "Romantic", "Orange"],
  ["EAB852", "Ronchi", "Yellow"],
  ["A14743", "Roof Terracotta", "Red"],
  ["8E593C", "Rope", "Orange"],
  ["D3A194", "Rose", "Red"],
  ["FEAB9A", "Rose Bud", "Red"],
  ["8A2D52", "Rose Bud Cherry", "Red"],
  ["AC512D", "Rose Of Sharon", "Orange"],
  ["905D5D", "Rose Taupe", "Violet"],
  ["FBEEE8", "Rose White", "Red"],
  ["BC8F8F", "Rosy Brown", "Brown"],
  ["B69642", "Roti", "Yellow"],
  ["A94064", "Rouge", "Red"],
  ["4169E1", "Royal Blue", "Blue"],
  ["B54B73", "Royal Heath", "Red"],
  ["6B3FA0", "Royal Purple", "Violet"],
  ["E0115F", "Ruby", "Red"],
  ["716675", "Rum", "Violet"],
  ["F1EDD4", "Rum Swizzle", "Green"],
  ["80461B", "Russet", "Brown"],
  ["7D655C", "Russett", "Brown"],
  ["B7410E", "Rust", "Red"],
  ["3A181A", "Rustic Red", "Red"],
  ["8D5F2C", "Rusty Nail", "Orange"],
  ["5D4E46", "Saddle", "Brown"],
  ["8B4513", "Saddle Brown", "Brown"],
  ["FF6600", "Safety Orange", "Orange"],
  ["F4C430", "Saffron", "Yellow"],
  ["989F7A", "Sage", "Green"],
  ["B79826", "Sahara", "Yellow"],
  ["A5CEEC", "Sail", "Blue"],
  ["177B4D", "Salem", "Green"],
  ["FA8072", "Salmon", "Red"],
  ["FFD67B", "Salomie", "Yellow"],
  ["696268", "Salt Box", "Violet"],
  ["EEF3E5", "Saltpan", "Grey"],
  ["3B2E25", "Sambuca", "Brown"],
  ["2C6E31", "San Felix", "Green"],
  ["445761", "San Juan", "Blue"],
  ["4E6C9D", "San Marino", "Blue"],
  ["867665", "Sand Dune", "Brown"],
  ["A3876A", "Sandal", "Brown"],
  ["AF937D", "Sandrift", "Brown"],
  ["786D5F", "Sandstone", "Brown"],
  ["DECB81", "Sandwisp", "Yellow"],
  ["FEDBB7", "Sandy Beach", "Orange"],
  ["F4A460", "Sandy Brown", "Brown"],
  ["92000A", "Sangria", "Red"],
  ["6C3736", "Sanguine Brown", "Red"],
  ["9998A7", "Santas Grey", "Blue"],
  ["A96A50", "Sante Fe", "Orange"],
  ["E1D5A6", "Sapling", "Yellow"],
  ["082567", "Sapphire", "Blue"],
  ["555B2C", "Saratoga", "Green"],
  ["F4EAE4", "Sauvignon", "Red"],
  ["F5DEC4", "Sazerac", "Orange"],
  ["6F63A0", "Scampi", "Violet"],
  ["ADD9D1", "Scandal", "Green"],
  ["FF2400", "Scarlet", "Red"],
  ["4A2D57", "Scarlet Gum", "Violet"],
  ["7E2530", "Scarlett", "Red"],
  ["6B6A6C", "Scarpa Flow", "Grey"],
  ["87876F", "Schist", "Green"],
  ["FFD800", "School Bus Yellow", "Yellow"],
  ["8D8478", "Schooner", "Brown"],
  ["308EA0", "Scooter", "Blue"],
  ["6A6466", "Scorpion", "Grey"],
  ["EEE7C8", "Scotch Mist", "Yellow"],
  ["66FF66", "Screamin' Green", "Green"],
  ["3D4031", "Scrub", "Green"],
  ["EF9548", "Sea Buckthorn", "Orange"],
  ["DFDDD6", "Sea Fog", "Grey"],
  ["2E8B57", "Sea Green", "Green"],
  ["C2D5C4", "Sea Mist", "Green"],
  ["8AAEA4", "Sea Nymph", "Green"],
  ["DB817E", "Sea Pink", "Red"],
  ["77B7D0", "Seagull", "Blue"],
  ["321414", "Seal Brown", "Brown"],
  ["69326E", "Seance", "Violet"],
  ["FFF5EE", "Seashell", "White"],
  ["37412A", "Seaweed", "Green"],
  ["E6DFE7", "Selago", "Violet"],
  ["FFBA00", "Selective Yellow", "Yellow"],
  ["6B4226", "Semi-Sweet Chocolate", "Brown"],
  ["9E5B40", "Sepia", "Brown"],
  ["FCE9D7", "Serenade", "Orange"],
  ["837050", "Shadow", "Green"],
  ["9AC0B6", "Shadow Green", "Green"],
  ["9F9B9D", "Shady Lady", "Grey"],
  ["609AB8", "Shakespeare", "Blue"],
  ["F8F6A8", "Shalimar", "Green"],
  ["33CC99", "Shamrock", "Green"],
  ["009E60", "Shamrock Green", "Green"],
  ["34363A", "Shark", "Grey"],
  ["00494E", "Sherpa Blue", "Green"],
  ["1B4636", "Sherwood Green", "Green"],
  ["E6B2A6", "Shilo", "Red"],
  ["745937", "Shingle Fawn", "Brown"],
  ["7988AB", "Ship Cove", "Blue"],
  ["4E4E4C", "Ship Grey", "Grey"],
  ["842833", "Shiraz", "Red"],
  ["E899BE", "Shocking", "Violet"],
  ["FC0FC0", "Shocking Pink", "Red"],
  ["61666B", "Shuttle Grey", "Grey"],
  ["686B50", "Siam", "Green"],
  ["E9D9A9", "Sidecar", "Yellow"],
  ["A0522D", "Sienna", "Brown"],
  ["BBADA1", "Silk", "Brown"],
  ["C0C0C0", "Silver", "Grey"],
  ["ACAEA9", "Silver Chalice", "Grey"],
  ["BEBDB6", "Silver Sand", "Grey"],
  ["67BE90", "Silver Tree", "Green"],
  ["A6D5D0", "Sinbad", "Green"],
  ["69293B", "Siren", "Red"],
  ["68766E", "Sirocco", "Green"],
  ["C5BAA0", "Sisal", "Yellow"],
  ["9DB4AA", "Skeptic", "Green"],
  ["87CEEB", "Sky Blue", "Blue"],
  ["6A5ACD", "Slate Blue", "Blue"],
  ["708090", "Slate Grey", "Grey"],
  ["42342B", "Slugger", "Brown"],
  ["003399", "Smalt", "Blue"],
  ["496267", "Smalt Blue", "Blue"],
  ["BB5F34", "Smoke Tree", "Orange"],
  ["605D6B", "Smoky", "Violet"],
  ["FFFAFA", "Snow", "White"],
  ["E3E3DC", "Snow Drift", "Grey"],
  ["EAF7C9", "Snow Flurry", "Green"],
  ["D6F0CD", "Snowy Mint", "Green"],
  ["E4D7E5", "Snuff", "Violet"],
  ["ECE5DA", "Soapstone", "Grey"],
  ["CFBEA5", "Soft Amber", "Yellow"],
  ["EEDFDE", "Soft Peach", "Red"],
  ["85494C", "Solid Pink", "Red"],
  ["EADAC2", "Solitaire", "Yellow"],
  ["E9ECF1", "Solitude", "Blue"],
  ["DD6B38", "Sorbus", "Orange"],
  ["9D7F61", "Sorrell Brown", "Brown"],
  ["C9B59A", "Sour Dough", "Brown"],
  ["6F634B", "Soya Bean", "Brown"],
  ["4B433B", "Space Shuttle", "Brown"],
  ["7B8976", "Spanish Green", "Green"],
  ["DED1B7", "Spanish White", "Yellow"],
  ["375D4F", "Spectra", "Green"],
  ["6C4F3F", "Spice", "Brown"],
  ["8B5F4D", "Spicy Mix", "Brown"],
  ["FF1CAE", "Spicy Pink", "Red"],
  ["B3C4D8", "Spindle", "Blue"],
  ["F1D79E", "Splash", "Yellow"],
  ["7ECDDD", "Spray", "Blue"],
  ["A7FC00", "Spring Bud", "Green"],
  ["00FF7F", "Spring Green", "Green"],
  ["A3BD9C", "Spring Rain", "Green"],
  ["F1F1C6", "Spring Sun", "Green"],
  ["E9E1D9", "Spring Wood", "Grey"],
  ["B8CA9D", "Sprout", "Green"],
  ["A2A1AC", "Spun Pearl", "Blue"],
  ["8F7D6B", "Squirrel", "Brown"],
  ["325482", "St Tropaz", "Blue"],
  ["858885", "Stack", "Grey"],
  ["A0A197", "Star Dust", "Grey"],
  ["D2C6B6", "Stark White", "Yellow"],
  ["E3DD39", "Starship", "Green"],
  ["4682B4", "Steel Blue", "Blue"],
  ["43464B", "Steel Grey", "Grey"],
  ["833D3E", "Stiletto", "Red"],
  ["807661", "Stonewall", "Yellow"],
  ["65645F", "Storm Dust", "Grey"],
  ["747880", "Storm Grey", "Blue"],
  ["DABE82", "Straw", "Yellow"],
  ["946A81", "Strikemaster", "Violet"],
  ["406356", "Stromboli", "Green"],
  ["724AA1", "Studio", "Violet"],
  ["8C9C9C", "Submarine", "Blue"],
  ["EEEFDF", "Sugar Cane", "Green"],
  ["C6EA80", "Sulu", "Green"],
  ["8FB69C", "Summer Green", "Green"],
  ["38B0DE", "Summer Sky", "Blue"],
  ["EF8E38", "Sun", "Orange"],
  ["C4AA4D", "Sundance", "Yellow"],
  ["F8AFA9", "Sundown", "Red"],
  ["DAC01A", "Sunflower", "Yellow"],
  ["C76155", "Sunglo", "Red"],
  ["FFCC33", "Sunglow", "Orange"],
  ["C0514A", "Sunset", "Red"],
  ["FE4C40", "Sunset Orange", "Orange"],
  ["FA9D49", "Sunshade", "Orange"],
  ["FFB437", "Supernova", "Yellow"],
  ["B8D4BB", "Surf", "Green"],
  ["C3D6BD", "Surf Crest", "Green"],
  ["007B77", "Surfie Green", "Green"],
  ["7C9F2F", "Sushi", "Green"],
  ["8B8685", "Suva Grey", "Grey"],
  ["252F2F", "Swamp", "Green"],
  ["DAE6DD", "Swans Down", "Grey"],
  ["F9E176", "Sweet Corn", "Yellow"],
  ["EE918D", "Sweet Pink", "Red"],
  ["D7CEC5", "Swirl", "Grey"],
  ["DBD0CA", "Swiss Coffee", "Grey"],
  ["F6AE78", "Tacao", "Orange"],
  ["D2B960", "Tacha", "Yellow"],
  ["DC722A", "Tahiti Gold", "Orange"],
  ["D8CC9B", "Tahuna Sands", "Yellow"],
  ["853534", "Tall Poppy", "Red"],
  ["A39977", "Tallow", "Yellow"],
  ["752B2F", "Tamarillo", "Red"],
  ["D2B48C", "Tan", "Brown"],
  ["B8B5A1", "Tana", "Green"],
  ["1E2F3C", "Tangaroa", "Blue"],
  ["F28500", "Tangerine", "Orange"],
  ["FFCC00", "Tangerine Yellow", "Yellow"],
  ["D46F31", "Tango", "Orange"],
  ["7C7C72", "Tapa", "Green"],
  ["B37084", "Tapestry", "Red"],
  ["DEF1DD", "Tara", "Green"],
  ["253C48", "Tarawera", "Blue"],
  ["BAC0B3", "Tasman", "Grey"],
  ["483C32", "Taupe", "Grey"],
  ["8B8589", "Taupe Grey", "Grey"],
  ["643A48", "Tawny Port", "Red"],
  ["496569", "Tax Break", "Blue"],
  ["2B4B40", "Te Papa Green", "Green"],
  ["BFB5A2", "Tea", "Yellow"],
  ["D0F0C0", "Tea Green", "Green"],
  ["F883C2", "Tea Rose", "Orange"],
  ["AB8953", "Teak", "Yellow"],
  ["008080", "Teal", "Blue"],
  ["254855", "Teal Blue", "Blue"],
  ["3C2126", "Temptress", "Brown"],
  ["CD5700", "Tenne (Tawny)", "Orange"],
  ["F4D0A4", "Tequila", "Yellow"],
  ["E2725B", "Terra Cotta", "Red"],
  ["ECE67E", "Texas", "Green"],
  ["FCB057", "Texas Rose", "Orange"],
  ["B1948F", "Thatch", "Brown"],
  ["544E31", "Thatch Green", "Yellow"],
  ["D8BFD8", "Thistle", "Violet"],
  ["4D4D4B", "Thunder", "Grey"],
  ["923830", "Thunderbird", "Red"],
  ["97422D", "Tia Maria", "Orange"],
  ["B9C3BE", "Tiara", "Grey"],
  ["184343", "Tiber", "Green"],
  ["FC80A5", "Tickle Me Pink", "Red"],
  ["F0F590", "Tidal", "Green"],
  ["BEB4AB", "Tide", "Brown"],
  ["324336", "Timber Green", "Green"],
  ["D9D6CF", "Timberwolf", "Grey"],
  ["DDD6E1", "Titan White", "Violet"],
  ["9F715F", "Toast", "Brown"],
  ["6D5843", "Tobacco Brown", "Brown"],
  ["44362D", "Tobago", "Brown"],
  ["3E2631", "Toledo", "Violet"],
  ["2D2541", "Tolopea", "Violet"],
  ["4F6348", "Tom Thumb", "Green"],
  ["FF6347", "Tomato", "Red"],
  ["E79E88", "Tonys Pink", "Orange"],
  ["817C87", "Topaz", "Violet"],
  ["FD0E35", "Torch Red", "Red"],
  ["353D75", "Torea Bay", "Blue"],
  ["374E88", "Tory Blue", "Blue"],
  ["744042", "Tosca", "Red"],
  ["9CACA5", "Tower Grey", "Green"],
  ["6DAFA7", "Tradewind", "Green"],
  ["DDEDE9", "Tranquil", "Blue"],
  ["E2DDC7", "Travertine", "Green"],
  ["E2813B", "Tree Poppy", "Orange"],
  ["7E8424", "Trendy Green", "Green"],
  ["805D80", "Trendy Pink", "Violet"],
  ["C54F33", "Trinidad", "Orange"],
  ["AEC9EB", "Tropical Blue", "Blue"],
  ["00755E", "Tropical Rain Forest", "Green"],
  ["4C5356", "Trout", "Grey"],
  ["8E72C7", "True V", "Violet"],
  ["454642", "Tuatara", "Grey"],
  ["F9D3BE", "Tuft Bush", "Orange"],
  ["E3AC3D", "Tulip Tree", "Yellow"],
  ["DEA681", "Tumbleweed", "Brown"],
  ["46494E", "Tuna", "Grey"],
  ["585452", "Tundora", "Grey"],
  ["F5CC23", "Turbo", "Yellow"],
  ["A56E75", "Turkish Rose", "Red"],
  ["AE9041", "Turmeric", "Yellow"],
  ["40E0D0", "Turquoise", "Blue"],
  ["6CDAE7", "Turquoise Blue", "Blue"],
  ["363E1D", "Turtle Green", "Green"],
  ["AD6242", "Tuscany", "Orange"],
  ["E3E5B1", "Tusk", "Green"],
  ["BF914B", "Tussock", "Yellow"],
  ["F8E4E3", "Tutu", "Red"],
  ["DAC0CD", "Twilight", "Violet"],
  ["F4F6EC", "Twilight Blue", "Grey"],
  ["C19156", "Twine", "Yellow"],
  ["66023C", "Tyrian Purple", "Violet"],
  ["FF6FFF", "Ultra Pink", "Red"],
  ["120A8F", "Ultramarine", "Blue"],
  ["D4574E", "Valencia", "Red"],
  ["382C38", "Valentino", "Violet"],
  ["2A2B41", "Valhalla", "Violet"],
  ["523936", "Van Cleef", "Brown"],
  ["CCB69B", "Vanilla", "Brown"],
  ["EBD2D1", "Vanilla Ice", "Red"],
  ["FDEFD3", "Varden", "Yellow"],
  ["C80815", "Venetian Red", "Red"],
  ["2C5778", "Venice Blue", "Blue"],
  ["8B7D82", "Venus", "Violet"],
  ["62603E", "Verdigris", "Grey"],
  ["48531A", "Verdun Green", "Green"],
  ["FF4D00", "Vermilion", "Red"],
  ["5C4033", "Very Dark Brown", "Brown"],
  ["CDCDCD", "Very Light Grey", "Grey"],
  ["A85533", "Vesuvius", "Orange"],
  ["564985", "Victoria", "Violet"],
  ["5F9228", "Vida Loca", "Green"],
  ["4DB1C8", "Viking", "Blue"],
  ["955264", "Vin Rouge", "Red"],
  ["C58F9D", "Viola", "Red"],
  ["2E2249", "Violent Violet", "Violet"],
  ["EE82EE", "Violet", "Violet"],
  ["9F5F9F", "Violet Blue", "Violet"],
  ["F7468A", "Violet Red", "Red"],
  ["40826D", "Viridian", "Blue"],
  ["4B5F56", "Viridian Green", "Green"],
  ["F9E496", "Vis Vis", "Yellow"],
  ["97D5B3", "Vista Blue", "Green"],
  ["E3DFD9", "Vista White", "Grey"],
  ["FF9980", "Vivid Tangerine", "Orange"],
  ["803790", "Vivid Violet", "Violet"],
  ["4E2728", "Volcano", "Red"],
  ["443240", "Voodoo", "Violet"],
  ["36383C", "Vulcan", "Grey"],
  ["D4BBB1", "Wafer", "Orange"],
  ["5B6E91", "Waikawa Grey", "Blue"],
  ["4C4E31", "Waiouru", "Green"],
  ["E4E2DC", "Wan White", "Grey"],
  ["849137", "Wasabi", "Green"],
  ["B6ECDE", "Water Leaf", "Green"],
  ["006E4E", "Watercourse", "Green"],
  ["D6CA3D", "Wattle", "Green"],
  ["F2CDBB", "Watusi", "Orange"],
  ["EEB39E", "Wax Flower", "Orange"],
  ["FDD7D8", "We Peep", "Red"],
  ["4C6B88", "Wedgewood", "Blue"],
  ["8E3537", "Well Read", "Red"],
  ["5C512F", "West Coast", "Yellow"],
  ["E5823A", "West Side", "Orange"],
  ["D4CFC5", "Westar", "Grey"],
  ["F1919A", "Wewak", "Red"],
  ["F5DEB3", "Wheat", "Brown"],
  ["DFD7BD", "Wheatfield", "Yellow"],
  ["D29062", "Whiskey", "Orange"],
  ["D4915D", "Whiskey Sour", "Orange"],
  ["EFE6E6", "Whisper", "Grey"],
  ["FFFFFF", "White", "White"],
  ["D7EEE4", "White Ice", "Green"],
  ["E7E5E8", "White Lilac", "Blue"],
  ["EEE7DC", "White Linen", "Grey"],
  ["F8F6D8", "White Nectar", "Green"],
  ["DAD6CC", "White Pointer", "Grey"],
  ["D4CFB4", "White Rock", "Green"],
  ["F5F5F5", "White Smoke", "White"],
  ["7A89B8", "Wild Blue Yonder", "Blue"],
  ["E3D474", "Wild Rice", "Green"],
  ["E7E4DE", "Wild Sand", "Grey"],
  ["FF3399", "Wild Strawberry", "Red"],
  ["FD5B78", "Wild Watermelon", "Red"],
  ["BECA60", "Wild Willow", "Green"],
  ["53736F", "William", "Green"],
  ["DFE6CF", "Willow Brook", "Green"],
  ["69755C", "Willow Grove", "Green"],
  ["462C77", "Windsor", "Violet"],
  ["522C35", "Wine Berry", "Red"],
  ["D0C383", "Winter Hazel", "Yellow"],
  ["F9E8E2", "Wisp Pink", "Red"],
  ["C9A0DC", "Wisteria", "Violet"],
  ["A29ECD", "Wistful", "Blue"],
  ["FBF073", "Witch Haze", "Green"],
  ["302621", "Wood Bark", "Brown"],
  ["463629", "Woodburn", "Brown"],
  ["626746", "Woodland", "Green"],
  ["45402B", "Woodrush", "Yellow"],
  ["2B3230", "Woodsmoke", "Grey"],
  ["554545", "Woody Brown", "Brown"],
  ["75876E", "Xanadu", "Green"],
  ["FFFF00", "Yellow", "Yellow"],
  ["9ACD32", "Yellow Green", "Green"],
  ["73633E", "Yellow Metal", "Yellow"],
  ["FFAE42", "Yellow Orange", "Orange"],
  ["F49F35", "Yellow Sea", "Yellow"],
  ["FFC5BB", "Your Pink", "Red"],
  ["826A21", "Yukon Gold", "Yellow"],
  ["C7B882", "Yuma", "Yellow"],
  ["6B5A5A", "Zambezi", "Brown"],
  ["B2C6B1", "Zanah", "Green"],
  ["C6723B", "Zest", "Orange"],
  ["3B3C38", "Zeus", "Grey"],
  ["81A6AA", "Ziggurat", "Blue"],
  ["EBC2AF", "Zinnwaldite", "Brown"],
  ["DEE3E3", "Zircon", "Grey"],
  ["DDC283", "Zombie", "Yellow"],
  ["A29589", "Zorba", "Brown"],
  ["17462E", "Zuccini", "Green"],
  ["CDD5D5", "Zumthor", "Grey"]
  ]
  
}  

// export { ntc }
const instance = ntc.init();

//alert(ntc.name('#5dbb63'));

const x = (() => {
    return 5;
})()

/** Class representing a color. */
class Color {
    /** List of valid color spaces */
    static validTypes = ['rgb', 'hex', 'hsl', 'xyz', 'lab', 'lchab', 'luv',
      'lchuv'];
  
    /** d65 standard illuminant in XYZ */
    static d65 = [95.05, 100, 108.9];
  
    /** Round values smaller than maxZeroTolerance to zero in computations which
    can fluctuate greatly near zero */
    static maxZeroTolerance = Math.pow(10, -12);
  
    /**
    * Create a color
    * @param {Object} config - Data for color and display preferences
    * @param {string|number[]} [config.color=[0,0,0]] - Color tuple or hexcode
    * @param {string} [type='rgb'] - Color space
    * @param {boolean} [capitalize=true] - Flag for output capitalization
    */
    constructor({
      color = [0, 0, 0],
      type = 'rgb',
      precision = 3,
      capitalize = true,
    } = {color: [0, 0, 0], type: 'rgb', precision: 3, capitalize: true}) {
      this.updateColor(color, type);
      this.precision = precision;
      this.capitalize = capitalize;
    }
  
    /**
    * Update conversions for color
    * @param {string|number[]} color - Color tuple or hexcode
    * @param {string} [type='rgb'] - Color space
    * @throws Will throw an error if type is not a string or not a supported type
    */
    updateColor(color, type = 'rgb') {
      let xyz;
      if (typeof type !== 'string') {
        throw new TypeError('Parameter 2 must be of type string.');
      }
      type = type.toLowerCase();
      if (!Color.validTypes.includes(type)) {
        throw new TypeError(`Parameter 2 '${type}' is not a valid type.`);
      }
      switch (type) {
        case 'rgb':
          xyz = Color.rgbToXyz(color);
          break;
        case 'hsl':
          xyz = Color.rgbToXyz(Color.hslToRgb(color));
          break;
        case 'hex':
          xyz = Color.rgbToXyz(Color.hexToRgb(color));
          break;
        case 'lab':
          xyz = Color.labToXyz(color);
          break;
        case 'lchab':
          xyz = Color.labToXyz(Color.lchABToLab(color));
          break;
        case 'luv':
          xyz = Color.luvToXyz(color);
          break;
        case 'lchuv':
          xyz = Color.luvToXyz(Color.lchUVToLuv(color));
          break;
        case 'xyz':
        // falls through
        case 'default':
          this._xyz = color;
          this._rgb = Color.xyzToRgb(this._xyz);
          this._hsl = Color.rgbToHsl(this._rgb);
          this._hex = Color.rgbToHex(this._rgb);
          this._lab = Color.xyzToLab(this._xyz);
          this._lchab = Color.labToLCHab(this._lab);
          this._luv = Color.xyzToLuv(this._xyz);
          this._lchuv = Color.luvToLCHuv(this._luv);
          break;
      }
      if (type !== 'xyz') {
        this.updateColor(xyz, 'xyz');
      }
    }
  
    /**
    * Get the underlying srgb tuple
    * @return {number[]} The srgb tuple
    */
    get rgb() {
      return this._rgb;
    }
  
    /**
    * Set the underlying srgb tuple
    * @param {number[]} rgb - 3 element srgb tuple
    */
    set rgb(rgb) {
      this.updateColor(rgb, 'rgb');
    }
  
    /**
    * Get the formatted rgb string
    * @return {string} The rgb string
    */
    get rgbString() {
      const str = 'RGB(' + this.rgb.join(', ') + ')';
      return (this.capitalize) ? str.toUpperCase() : str.toLowerCase();
    }
  
    /**
    * Get the underlying hsl tuple
    * @return {number[]} The hsl tuple
    */
    get hsl() {
      return this._hsl;
    }
  
    /**
    * Set the underlying hsl tuple
    * @param {number[]} hsl - 3 element hsl tuple
    */
    set hsl(hsl) {
      this.updateColor(hsl, 'hsl');
    }
  
    /**
    * Get the formatted hsl string
    * @return {string} The hsl string
    */
    get hslString() {
      const truncHSL = this.hsl.map((x) => x.toFixed(this.precision));
      const str = 'HSL(' + truncHSL.join(', ') + ')';
      return (this.capitalize) ? str.toUpperCase() : str.toLowerCase();
    }
  
    /**
    * Get the underlying hex code
    * @return {string} The hexcode
    */
    get hex() {
      return this._hex;
    }
  
    /**
    * Set the underlying hex code
    * @param {string} hex - 3 or 6 digit hexcode
    */
    set hex(hex) {
      this.updateColor(hex, 'hex');
    }
  
    /**
    * Get the formatted hex string
    * @return {string} The hex string
    */
    get hexString() {
      const str = this._hex;
      return (this.capitalize) ? str.toUpperCase() : str.toLowerCase();
    }
  
    /**
    * Get the underlying xyz tuple
    * @return {number[]} The xyz tuple
    */
    get xyz() {
      return this._xyz;
    }
  
    /**
    * Set the underlying xyz tuple
    * @param {number[]} xyz - 3 element xyz tuple
    */
    set xyz(xyz) {
      this.updateColor(xyz, 'xyz');
    }
  
    /**
    * Get the formatted xyz string
    * @return {string} The xyz string
    */
    get xyzString() {
      const truncXYZ = this.xyz.map((x) => x.toFixed(this.precision));
      const str = 'XYZ(' + truncXYZ.join(', ') + ')';
      return (this.capitalize) ? str.toUpperCase() : str.toLowerCase();
    }
  
    /**
    * Get the underlying lab tuple
    * @return {number[]} The lab tuple
    */
    get lab() {
      return this._lab;
    }
  
    /**
    * Set the underlying lab tuple
    * @param {number[]} lab - 3 element lab tuple
    */
    set lab(lab) {
      this.updateColor(lab, 'lab');
    }
  
    /**
    * Get the formatted lab string
    * @return {string} The lab string
    */
    get labString() {
      const truncLAB = this.lab.map((x) => x.toFixed(this.precision));
      const str = 'LAB(' + truncLAB.join(', ') + ')';
      return (this.capitalize) ? str.toUpperCase() : str.toLowerCase();
    }
  
    /**
    * Get the underlying lchab tuple
    * @return {number[]} The lchab tuple
    */
    get lchab() {
      return this._lchab;
    }
  
    /**
    * Set the underlying lchab tuple
    * @param {number[]} lchab - 3 element lchab tuple
    */
    set lchab(lchab) {
      this.updateColor(lchab, 'lchab');
    }
  
    /**
    * Get the formatted lchAB string
    * @return {string} The lchAB string
    */
    get lchabString() {
      const truncLCHAB = this.lchab.map((x) => x.toFixed(this.precision));
      return (this.capitalize) ?
        'LCHab(' + truncLCHAB.join(', ') + ')' :
        'lchAB(' + truncLCHAB.join(', ') + ')';
    }
  
    /**
    * Get the underlying luv tuple
    * @return {number[]} The luv tule
    */
    get luv() {
      return this._luv;
    }
  
    /**
    * Set the underlying luv tuple
    * @param {number[]} luv - 3 element luv tuple
    */
    set luv(luv) {
      this.updateColor(luv, 'luv');
    }
  
    /**
    * Get the formatted luv string
    * @return {string} The luv string
    */
    get luvString() {
      const truncLuv = this.luv.map((x) => x.toFixed(this.precision));
      const str = 'LUV(' + truncLuv.join(', ') + ')';
      return (this.capitalize) ? str.toUpperCase() : str.toLowerCase();
    }
  
    /**
    * Get the underlying lchuv tuple
    * @return {number[]} The lchuv tule
    */
    get lchuv() {
      return this._lchuv;
    }
  
    /**
    * Set the underlying lchuv tuple
    * @param {number[]} lchuv - 3 element lchuv tuple
    */
    set lchuv(lchuv) {
      this.updateColor(lchuv, 'lchuv');
    }
  
    /**
    * Get the formatted lchuv string
    * @return {string} The lchuv string
    */
    get lchuvString() {
      const truncLCHUV = this.lchuv.map((x) => x.toFixed(this.precision));
      return (this.capitalize) ?
        'LCHuv(' + truncLCHUV.join(', ') + ')' :
        'lchUV(' + truncLCHUV.join(', ') + ')';
    }
  
    /**
    * Convert a 3 element srgb tuple to a 3 element hsl tuple.
    * @param {number[]} rgb - The srgb tuple
    * @return {number[]} The hsl tuple
    */
    static rgbToHsl(rgb) {
      // Normalize rgb tuple to [0,1]
      const r1 = rgb[0] / 255;
      const g1 = rgb[1] / 255;
      const b1 = rgb[2] / 255;
      // Lightness is average of max and min normalized rgb values
      const maxColor = Math.max(r1, g1, b1);
      const minColor = Math.min(r1, g1, b1);
      let L = (maxColor + minColor) / 2;
      // Hue and saturation are only non zero if color is grey
      // A color is grey if all r,g,b are all the same (maxColor===minColor)
      let S = 0;
      let H = 0;
      if (maxColor !== minColor) {
        if (L < 0.5) {
          S = (maxColor - minColor) / (maxColor + minColor);
        } else {
          S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        if (r1 === maxColor) {
          H = (g1 - b1) / (maxColor - minColor);
        } else if (g1 === maxColor) {
          H = 2.0 + (b1 - r1) / (maxColor - minColor);
        } else {
          H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
      }
      // Scale up to [0,100] for Lightnexx and saturation, [0,360) for Hue
      L = L * 100;
      S = S * 100;
      H = H * 60;
      // Hue has a period of 360deg, if hue is negative, get positive hue
      // by scaling h to (-360,0) and adding 360
      H = (H < 0) ? H % 360 + 360 : H;
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [H + 0, S + 0, L + 0];
    }
  
    /**
    * Convert a 3 element hsl tuple to a 3 element srgb tuple.
    * @param {number[]} hsl - The hsl tuple
    * @return {number[]} The srgb tuple
    */
    static hslToRgb(hsl) {
      let h = hsl[0];
      let s = hsl[1];
      let l = hsl[2];
      // Any nonfinite hsl is reset to 0
      if (!isFinite(h)) {
        h = 0;
      }
      if (!isFinite(s)) {
        s = 0;
      }
      if (!isFinite(l)) {
        l = 0;
      }
      // Hue has a period of 360deg, if hue is negative, get positive hue
      // by scaling h to (-360,0) and adding 360
      h = (h < 0) ? h % 360 + 360 : h;
      // Normalize saturation and lightness to [0,1], hue [0,6)
      l /= 100;
      s /= 100;
      h /= 60;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(h % 2 - 1));
      const m = l - c / 2;
      let rgb1;
      if (h < 1) {
        rgb1 = [c, x, 0];
      } else if (h < 2) {
        rgb1 = [x, c, 0];
      } else if (h < 3) {
        rgb1 = [0, c, x];
      } else if (h < 4) {
        rgb1 = [0, x, c];
      } else if (h < 5) {
        rgb1 = [x, 0, c];
      } else {
        rgb1 = [c, 0, x];
      }
      // Add zero to prevent signed zeros (force 0 rather than -0)
      const rgb = rgb1.map((val) => Math.round((val + m) * 255) + 0);
      return rgb;
    }
  
    /**
    * Convert a 3 element srgb tuple to a six digit hexcode
    * @param {number[]} rgb - The srgb tuple
    * @return {string} The hexcode
    */
    static rgbToHex(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      const b = rgb[2];
      // Use built-in toString to convert to hexadecimal
      // Prepend single digit conversion with '0'
      const hexChar = function hexChar(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return '#' + hexChar(r) + hexChar(g) + hexChar(b);
    }
  
    /**
    * Convert a three or six digit hexcode to srgb
    * @param {string} hex - The hexcode
    * @return {number[]} The srgb tuple
    */
    static hexToRgb(hex) {
      // If 3 digit hexcode then double each digit 6 digit
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });
      // Use built-in base16 parser to convert to rgb
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      // Cant use map since first element of result is the whole matched string
      // Do not need to add 0 since parseInt converts -0 to 0
      return result ?
        [parseInt(result[1], 16), parseInt(result[2], 16),
          parseInt(result[3], 16)] :
        null;
    }
  
    /**
    * Convert a 3 element srgb tuple to a 3 element xyz tuple.
    * @param {number[]} rgb - The srgb tuple
    * @return {number[]} The xyz tuple
    */
    static rgbToXyz(rgb) {
      // Normalise rgb to [0,1]
      const cR = rgb[0] / 255;
      const cG = rgb[1] / 255;
      const cB = rgb[2] / 255;
      // sRGB is a gamma corrected format (a method of adjusting color
      // to match non linear human perception of light) gamma correction
      // must undone. The inverse function is linear below a corrected
      // value of 0.04045 since gamma correction is linear at 0.0031308
      const invCompand = (c) => (c <= 0.04045) ?
        c / 12.92 :
        Math.pow((c + 0.055) / 1.055, 2.4);
      const invR = invCompand(cR);
      const invG = invCompand(cG);
      const invB = invCompand(cB);
      // Linear rgb is then undergoes a forward transformation to xyz
      const x = 0.4124 * invR + 0.3576 * invG + 0.1805 * invB;
      const y = 0.2126 * invR + 0.7152 * invG + 0.0722 * invB;
      const z = 0.0193 * invR + 0.1192 * invG + 0.9505 * invB;
      // xyz scaled to [0,100]
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [x * 100 + 0, y * 100 + 0, z * 100 + 0];
    }
  
    /**
    * Convert a 3 element xyz tuple to a 3 element srgb tuple.
    * @param {number[]} xyz - The xyz tuple
    * @return {number[]} The srgb tuple
    */
    static xyzToRgb(xyz) {
      // xyz is normalized to [0,1]
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      // xyz is multiplied by the reverse transformation matrix to linear rgb
      const invR = 3.2406254773200533 * x - 1.5372079722103187 * y -
        0.4986285986982479 * z;
      const invG = -0.9689307147293197 * x + 1.8757560608852415 * y +
        0.041517523842953964 * z;
      const invB = 0.055710120445510616 * x + -0.2040210505984867 * y +
        1.0569959422543882 * z;
      // Linear rgb must be gamma corrected to normalized srgb. Gamma correction
      // is linear for values <= 0.0031308 to avoid infinite log slope near zero
      const compand = (c) => c <= 0.0031308 ?
        12.92 * c :
        1.055 * Math.pow(c, 1 / 2.4) - 0.055;
      const cR = compand(invR);
      const cG = compand(invG);
      const cB = compand(invB);
      // srgb is scaled to [0,255]
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [Math.round(cR * 255) + 0, Math.round(cG * 255) + 0,
        Math.round(cB * 255) + 0];
    }
  
    /**
    * Convert a 3 element xyz tuple to a 3 element lab tuple.
    * @param {number[]} xyz - The xyz tuple
    * @return {number[]} The lab tuple
    */
    static xyzToLab(xyz) {
      const xR = xyz[0] / Color.d65[0];
      const yR = xyz[1] / Color.d65[1];
      const zR = xyz[2] / Color.d65[2];
      const eps = 216 / 24389;
      const kap = 24389 / 27;
      // Use cube root function if available for additional precision
      const cbrt = (Math.cbrt != null) ?
        Math.cbrt :
        (val) => Math.pow(val, 1 / 3);
      const fwdTrans = (c) => c > eps ? cbrt(c) : (kap * c + 16) / 116;
      const fX = fwdTrans(xR);
      const fY = fwdTrans(yR);
      const fZ = fwdTrans(zR);
      const L = 116 * fY - 16;
      const a = 500 * (fX - fY);
      const b = 200 * (fY - fZ);
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [L + 0, a + 0, b + 0];
    }
  
    /**
    * Convert a 3 element lab tuple to a 3 element xyz tuple.
    * @param {number[]} lab - The lab tuple
    * @return {number[]} The xyz tuple
    */
    static labToXyz(lab) {
      const L = lab[0];
      const a = lab[1];
      const b = lab[2];
      const eps = 216 / 24389;
      const kap = 24389 / 27;
      const fY = (L + 16) / 116;
      const fZ = (fY - b / 200);
      const fX = a / 500 + fY;
      const xR = Math.pow(fX, 3) > eps ? Math.pow(fX, 3) : (116 * fX - 16) / kap;
      const yR = L > kap * eps ? Math.pow((L + 16) / 116, 3) : L / kap;
      const zR = Math.pow(fZ, 3) > eps ? Math.pow(fZ, 3) : (116 * fZ - 16) / kap;
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [xR * Color.d65[0] + 0, yR * Color.d65[1] + 0,
        zR * Color.d65[2] + 0];
    }
  
    /**
    * Convert a 3 element lab tuple to a 3 element lchab tuple.
    * @param {number[]} lab - The lab tuple
    * @return {number[]} The lchab tuple
    */
    static labToLCHab(lab) {
      const a = lab[1];
      // Since atan2 behaves unpredicably for non-zero values of b near 0,
      // round b within the given tolerance
      const b = (Math.abs(lab[2]) < Color.maxZeroTolerance) ? 0 : lab[2];
      const c = Math.sqrt(a * a + b * b);
      const h = Math.atan2(b, a) >= 0 ?
        Math.atan2(b, a) / Math.PI * 180 :
        Math.atan2(b, a) / Math.PI * 180 + 360;
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [lab[0] + 0, c + 0, h + 0];
    }
  
    /**
    * Convert a 3 element lchab tuple to a 3 element lab tuple.
    * @param {number[]} lchAB - The lchAB tuple
    * @return {number[]} The lab tuple
    */
    static lchABToLab(lchAB) {
      const c = lchAB[1];
      const h = lchAB[2];
      const a = c * Math.cos(h / 180 * Math.PI);
      const b = c * Math.sin(h / 180 * Math.PI);
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [lchAB[0] + 0, a + 0, b + 0];
    }
  
    /**
    * Convert a 3 element xyz tuple to a 3 element luv tuple.
    * @param {number[]} xyz - The xyz tuple
    * @return {number[]} The luv tuple
    */
    static xyzToLuv(xyz) {
      const x = xyz[0];
      const y = xyz[1];
      const z = xyz[2];
      const eps = 216 / 24389;
      const kap = 24389 / 27;
      const Xn = Color.d65[0];
      const Yn = Color.d65[1];
      const Zn = Color.d65[2];
      const vR = 9 * Yn / (Xn + 15 * Yn + 3 * Zn);
      const uR = 4 * Xn / (Xn + 15 * Yn + 3 * Zn);
      // If XYZ = [0,0,0], avoid division by zero and return conversion
      if (x === 0 && y === 0 && z === 0) {
        return [0, 0, 0];
      }
      const v1 = 9 * y / (x + 15 * y + 3 * z);
      const u1 = 4 * x / (x + 15 * y + 3 * z);
      const yR = y / Yn;
      const cbrt = (Math.cbrt != null) ?
        Math.cbrt :
        (val) => Math.pow(val, 1 / 3);
      const L = (yR > eps) ? 116 * cbrt(yR, 1 / 3) - 16 : kap * yR;
      const u = 13 * L * (u1 - uR);
      const v = 13 * L * (v1 - vR);
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [L + 0, u + 0, v + 0];
    }
  
    /**
    * Convert a 3 element luv tuple to a 3 element xyz tuple.
    * @param {number[]} luv - The luv tuple
    * @return {number[]} The xyz tuple
    */
    static luvToXyz(luv) {
      const L = luv[0];
      const u = luv[1];
      const v = luv[2];
      const eps = 216 / 24389;
      const kap = 24389 / 27;
      const Xn = Color.d65[0];
      const Yn = Color.d65[1];
      const Zn = Color.d65[2];
      const v0 = 9 * Yn / (Xn + 15 * Yn + 3 * Zn);
      const u0 = 4 * Xn / (Xn + 15 * Yn + 3 * Zn);
      const y = (L > kap * eps) ? Math.pow((L + 16) / 116, 3) : L / kap;
      // If L is 0 (black), will evaluate to NaN, use 0
      const d = y * (39 * L / (v + 13 * L * v0) - 5) || 0;
      const c = -1 / 3;
      const b = -5 * y;
      // If L is 0 (black), will evaluate to NaN, use 0
      const a = (52 * L / (u + 13 * L * u0) - 1) / 3 || 0;
      const x = (d - b) / (a - c);
      const z = x * a + b;
      // x,y,z in [0,1] multiply by 100 to scale to [0,100]
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [x * 100 + 0, y * 100 + 0, z * 100 + 0];
    }
  
    /**
    * Convert a 3 element luv tuple to a 3 element lchuv tuple.
    * @param {number[]} luv - The luv tuple
    * @return {number[]} The lchuv tuple
    */
    static luvToLCHuv(luv) {
      const L = luv[0];
      const u = (Math.abs(luv[1]) < Color.maxZeroTolerance) ? 0 : luv[1];
      // Since atan2 behaves unpredicably for non-zero values of v near 0,
      // round v within the given tolerance
      const v = (Math.abs(luv[2]) < Color.maxZeroTolerance) ? 0 : luv[2];
      const c = Math.sqrt(u * u + v * v);
      // Math.atan2 returns angle in radians so convert to degrees
      let h = Math.atan2(v, u) * 180 / Math.PI;
      // If hue is negative add 360
      h = (h >= 0) ? h : h + 360;
      // Add zero to prevent signed zeros (force 0 rather than -0)
      return [L + 0, c + 0, h + 0];
    }
  
    /**
    * Convert a 3 element luv lchuv to a 3 element luv tuple.
    * @param {number[]} lchUV - The lchuv tuple
    * @return {number[]} The luv tuple
    */
    static lchUVToLuv(lchUV) {
      const L = lchUV[0];
      const c = lchUV[1];
      // Convert hue to radians for use with Math.cos and Math.sin
      const h = lchUV[2] / 180 * Math.PI;
      const u = c * Math.cos(h);
      const v = c * Math.sin(h);
      return [L + 0, u + 0, v + 0];
    }
  
    /**
    * Computes luminance of a 3 element tuple or hexcode
    * @param {number[]|string} color - The color tuple or hexcode
    * @param {string} [type='rgb'] - The color space
    * @return {number} The luminance of the color
    * @throws Will throw an error if type is not a string or not a supported type
    */
    static luminance(color, type = 'rgb') {
      if (typeof type !== 'string') {
        throw new TypeError('Parameter 2 must be of type string.');
      }
      type = type.toLowerCase();
      if (!Color.validTypes.includes(type)) {
        throw new TypeError(`Parameter 2 '${type}' is not a valid type.`);
      }
      // Convert any non-rgb color to rgb
      if (type !== 'rgb') {
        color = (new Color({color, type})).rgb;
      }
      // Remove reference to previous array when calculating contrast ratio
      color = [...color];
      // Converts color to luminance as denoted by y from the rgb to xyz
      // conversions above
      for (let i = 0; i < color.length; i++) {
        color[i] /= 255;
        if (color[i] < 0.03928) {
          color[i] /= 12.92;
        } else {
          color[i] = Math.pow((((color[i]) + 0.055) / 1.055), 2.4);
        }
      }
      const r = color[0];
      const g = color[1];
      const b = color[2];
  
      const l = ((0.2126 * r) + (0.7152 * g) + (0.0722 * b));
      return l;
    }
  
    /**
    * Returns a random new Color instance
    * @return {Color} The new Color instance
    */
    static random() {
      return new Color({
        color: [255, 255, 255].map((n) => Math.round(n * Math.random())),
      });
    }
  
    /**
    * Returns a deterministic random new Color instance for a given string
    * @param {string} [str=''] - The string to hash for the random color
    * @return {Color} The new Color instance
    */
    static randomFromString(str = '') {
      // PJW-32 hash string to get numeric value
      const pjw = (str) => {
        let h = 0xffffffff;
        for (let i = 0; i < str.length; i++) {
          h = (h << 4) + str.charCodeAt(i);
          const g = h & 0xf0000000;
          if (g !== 0) {
            h ^= (g >>> 24);
            h ^= g;
          }
        }
        return Math.abs(h);
      };
      // Generate 3 hashes for r,g,b values
      // Each hash gets appended previous hash as pseudo salt
      const h1 = pjw(str);
      const h2 = pjw(str + h1);
      const h3 = pjw(str + h2);
      // Mod 256 to generate values in [0,255]
      return new Color({
        color: [h1 % 256, h2 % 256, h3 % 256],
      });
    }
  
    /**
    * Returns a random new Color tuple or hexcode
    * @param {string} [type='rgb'] - The color space
    * @return {number[]|string} The 3 element color tuple or hexcode
    * @throws Will throw an error if type is not a string or not a supported type
    */
    static randomOfType(type = 'rgb') {
      if (typeof type !== 'string') {
        throw new TypeError('Parameter 1 must be of type string.');
      }
      type = type.toLowerCase();
      if (!Color.validTypes.includes(type)) {
        throw new TypeError(`Parameter 1 '${type}' is not a valid type.`);
      }
      const randColor = Color.random();
      return randColor[type];
    }
  
    /**
    * Returns a random color's formatted string
    * @param {string} [type='rgb'] - The color space
    * @param {boolean} [capitalize=true] - Flag for output capitalization
    * @param {number} [precision=3] - Number of decimals in output string
    * @return {string} The formatted color string of the random color
    * @throws Will throw an error if type is not a string or not a supported type
    */
    static randomOfTypeFormatted(type = 'rgb', capitalize = true, precision = 3) {
      if (typeof type !== 'string') {
        throw new TypeError('Parameter 1 must be of type string.');
      }
      type = type.toLowerCase();
      if (!Color.validTypes.includes(type)) {
        throw new TypeError(`Parameter 1 '${type}' is not a valid type.`);
      }
      const randColor = Color.random();
      randColor.capitalize = capitalize;
      randColor.precision = precision;
      return randColor[type + 'String'];
    }
  
    /**
    * Returns white or black dependent on which has a greater contrast with the
    * given color
    * @param {number[]|string} color - The color tuple or hexcode
    * @param {string} [type='rgb'] - The color space
    * @return {string} The hexcode for white or black
    * @throws Will throw an error if type is not a string or not a supported type
    */
    static contrastTextColor(color, type = 'rgb') {
      if (typeof type !== 'string') {
        throw new TypeError('Parameter 2 must be of type string.');
      }
      type = type.toLowerCase();
      if (!Color.validTypes.includes(type)) {
        throw new TypeError(`Parameter 2 '${type}' is not a valid type.`);
      }
      const contrastWhite = Color.contrastRatio(
          new Color({color: [255, 255, 255]}),
          new Color({color, type}),
      );
      const contrastBlack = Color.contrastRatio(
          new Color({color: [0, 0, 0]}),
          new Color({color, type}),
      );
      if (contrastWhite > contrastBlack) {
        return '#FFFFFF';
      } else {
        return '#000000';
      }
    }
  
    /**
    * Computes the contrast ratio between two colors
    * @param {Color} color1 - The first color
    * @param {Color} color2 - The second color
    * @return {number} The contrast ratio between the given colors
    * @throws Will throw an error if either parameter is not a color instance
    */
    static contrastRatio(color1, color2) {
      if (!(color1 instanceof Color)) {
        throw new TypeError('Parameter 1 must be of type Color.');
      }
      if (!(color2 instanceof Color)) {
        throw new TypeError('Parameter 2 must be of type Color.');
      }
      const luminance1 = Color.luminance(color1.rgb) + 0.05;
      const luminance2 = Color.luminance(color2.rgb) + 0.05;
      return luminance2 > luminance1 ?
        luminance2 / luminance1 :
        luminance1 / luminance2;
    }
  
    /**
    * Computes a weighted average of two colors for a given colorspace
    * @param {Color} color1 - The first color
    * @param {Color} color2 - The second color
    * @param {string} [type='rgb'] - The colorspace to blend the colors in
    * @param {number} [weight=0.5] - The weight given to the first color in blend
    * @return {number} The contrast ratio between the given colors
    * @throws Will throw an error if either parameter is not a color instance
    */
    static blend(color1, color2, type = 'rgb', weight = 0.5) {
      if (!(color1 instanceof Color)) {
        throw new TypeError('Parameter 1 must be of type Color.');
      }
      if (!(color2 instanceof Color)) {
        throw new TypeError('Parameter 2 must be of type Color.');
      }
      if (typeof type !== 'string') {
        throw new TypeError('Parameter 3 must be of type string.');
      }
      type = type.toLowerCase();
      if (!Color.validTypes.includes(type)) {
        throw new TypeError(`Parameter 3 '${type}' is not a valid type.`);
      }
      // Blend hex colors as rgb
      type = (type === 'hex') ? 'rgb' : type;
      const triplet1 = color1[type];
      const triplet2 = color2[type];
      const blend = (new Array(3)).fill().map((val, i) => {
        return triplet1[i] * weight + triplet2[i] * (1 - weight);
      });
      return new Color({
        'color': blend,
        'type': type,
      });
    }
  }

function updatedColor(color){
    // console.log(color);
    color = color.toUpperCase();
    let newColor = '';
    //get the color name of the hex passed in 
    let colorBreakDown = ntc.name(color);
    let shadeColor = colorBreakDown[3];
    //check if color is green
    if(shadeColor === 'Green') {
        let rgbValueGreen = HEXtoRGB(color)
        let rValueGreen = rgbValueGreen[0];
        let gValueGreen = rgbValueGreen[1];
        let bValueGreen = rgbValueGreen[2];
        newColor = greenToRed(rValueGreen, gValueGreen, bValueGreen);
    } else if (color === '#E3FCF7') {
        newColor = '#F7E2E2'
    } else if (color === '#016BF8' || color === '#006CFA') {
        newColor = '#DB3030' 
    } else if (color === '#1254B7') {
        newColor = '#970606'
    } else if (color === '#C3E7FE') {
        newColor = '#FFE1E9'
    } else if (color === '#E1F7FF') {
        newColor = '#FEC3C3'
    } else {
        newColor = color;
    }
    return newColor;
}

function greenToRed(greenR, greenG, greenB) {
    let XYZ = RGBtoXYZ(greenR,greenG,greenB)
    let colX = XYZ[0];
    let colY = XYZ[1];
    let colZ = XYZ[2];  
    let LAB = XYZtoLAB(colX, colY, colZ)
    

    let greenL = LAB[0];
    let greenA = LAB[1];
    let greenB2 = LAB[2];

    let redL = greenL;
    let redA = (greenA) * (-1);
    let redB = greenB2;

    let redXYZ = LABtoXYZ(redL, redA, redB)
    let redX = redXYZ[0];
    let redY = redXYZ[1];
    let redZ = redXYZ[2];

    let redRGB = XYZtoRGB(redX, redY, redZ)
    let redR = redRGB[0];
    let redG = redRGB[1];
    let redB2 = redRGB[2];

    let redReturn = 'rgb' + '(' + String(redRGB) + ')'
    return redReturn;
}

function RGBtoXYZ(R, G, B)
{
    let var_R = parseFloat( R / 255 )        //R from 0 to 255
    let var_G = parseFloat( G / 255 )        //G from 0 to 255
    let var_B = parseFloat( B / 255 )        //B from 0 to 255

    if ( var_R > 0.04045 ) var_R = ( ( var_R + 0.055 ) / 1.055 ) ** 2.4
    else                   var_R = var_R / 12.92
    if ( var_G > 0.04045 ) var_G = ( ( var_G + 0.055 ) / 1.055 ) ** 2.4
    else                   var_G = var_G / 12.92
    if ( var_B > 0.04045 ) var_B = ( ( var_B + 0.055 ) / 1.055 ) ** 2.4
    else                   var_B = var_B / 12.92

    var_R = var_R * 100
    var_G = var_G * 100
    var_B = var_B * 100

    //Observer. = 2°, Illuminant = D65
    let X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
    let Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
    let Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
    return [X, Y, Z]
}


function XYZtoLAB(x, y, z)
{
    let ref_X =  95.047;
    let ref_Y = 100.000;
    let ref_Z = 108.883;

    let var_X = x / ref_X          //ref_X =  95.047   Observer= 2°, Illuminant= D65
    let var_Y = y / ref_Y          //ref_Y = 100.000
    let var_Z = z / ref_Z          //ref_Z = 108.883

    if ( var_X > 0.008856 ) var_X = Math.pow( var_X, 1/3 )
    else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y, 1/3 )
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
    if ( var_Z > 0.008856 ) var_Z = Math.pow (var_Z, 1/3 )
    else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

    let CIE_L = ( 116 * var_Y ) - 16
    let CIE_a = 500 * ( var_X - var_Y )
    let CIE_b = 200 * ( var_Y - var_Z )

return [CIE_L, CIE_a, CIE_b]
}

function LABtoXYZ(l, a, b){
    let answer = Color.labToXyz([l, a, b]);
    return answer
}

function XYZtoRGB(x, y, z){
    let answer2 = Color.xyzToRgb([x, y, z]);
    return answer2
}

function RGBtoHEX(r, g, b){
    let answer3 = Color.rgbToHex([r, g, b]);
    return answer3
}

function HEXtoRGB(hexIn){
    let answer4 = Color.hexToRgb(hexIn);
    return answer4
}

const grayscale = (color) => {
    const [r, g, b] = HEXtoRGB(color);
    const grayValue = Math.floor((r + g + b) / 3);
    // const newVal = 255 - grayValue; 
    const retstr = RGBtoHEX(grayValue, grayValue, grayValue);
    return retstr
}

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

const updateColors = (color) => {
    const allElements = document.getElementsByTagName('*');
    const set = new Set();

    // ✅ Loop through all elements (including html, head, meta, scripts)
    for (const element of allElements) {
        for (const c of element.classList.entries()) {
            set.add(c[1]);
        }
    }

    if (set.size < 10) {
        return false;
    }

    for (const className of set) {
        for (element of document.getElementsByClassName(className)) {
            element.style.color = "";
            element.style.backgroundColor = "";
            element.style.borderLeftColor = "";
            element.style.borderRightColor = "";
            element.style.borderTopColor = "";
            element.style.borderBottomColor = "";
            element.style.borderColor = "";
            element.style.filter = "";
            
            const one = (getComputedStyle(element, null).getPropertyValue("color")); 
            if (one != "rgba(0, 0, 0, 0)") {
                const oneHexVersion = rgba2hex(one).substring(0, 7);
                if (color === 0) {                
                    element.style.color = updatedColor(oneHexVersion);
                } else if (color === 1) {
                    element.style.color = grayscale(oneHexVersion);
                } else {
                }
            }
    
            const two = (getComputedStyle(element, null).getPropertyValue("background-color")); 
            if (two != "rgba(0, 0, 0, 0)") {
                const twoHexVersion = rgba2hex(two).substring(0, 7);
                if (color === 0) {                
                    element.style.backgroundColor = updatedColor(twoHexVersion);
                } else if (color === 1) {
                    element.style.backgroundColor = grayscale(twoHexVersion);
                } else {
                    element.style.backgroundColor = "";
                }            
            }
    
            if (element.tagName === "IMG") {
                if (color === 0) {
                    element.style.filter = "hue-rotate(200deg)";
                } else if (color === 1) {
                    element.style.filter = "grayscale(1)";
                } else {

                }
            } else {
                const three = (getComputedStyle(element, null).getPropertyValue("border-left-color")); 
                if (color === 0) {
                    if (three !== null && three !== "" && three !== "rgba(0, 0, 0, 0)") {
                        const threeHexVersion = rgba2hex(three).substring(0, 7);
                        element.style.borderLeftColor = updatedColor(threeHexVersion);
                        element.style.borderRightColor = updatedColor(threeHexVersion);
                        element.style.borderTopColor = updatedColor(threeHexVersion);
                        element.style.borderBottomColor = updatedColor(threeHexVersion);
                        element.style.borderColor = updatedColor(threeHexVersion);
                    }
                } else if (color === 1) {
                    if (three !== null && three !== "" && three !== "rgba(0, 0, 0, 0)") {
                        const threeHexVersion = rgba2hex(three).substring(0, 7);
                        element.style.borderLeftColor = grayscale(threeHexVersion);
                        element.style.borderRightColor = grayscale(threeHexVersion);
                        element.style.borderTopColor = grayscale(threeHexVersion);
                        element.style.borderBottomColor = grayscale(threeHexVersion);
                        element.style.borderColor = grayscale(threeHexVersion);
                    }
                }
            }
        }
    }

    return true;
}

let color = 1;

let updated = false;
// let count = 1; 

const intervalFunction = () => {
    chrome.storage.sync.get("color", function (obj) {
            color = obj['color']
            updated = updateColors(color);
            // count++; 
            // if (count > 5) {
            //     clearInterval(intee);
            // }
        // }, 1000)
    });
}

const startup = () => {
    intervalFunction();
    const fetchInterval = setInterval(intervalFunction, 5000)
}

const checkReady = setInterval(() => {
    if (document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML.includes("$")) {
        startup();
        clearInterval(checkReady);
    }
}, 10)

document.getElementsByClassName("fl-center-y")[0].innerHTML = "Stock";
