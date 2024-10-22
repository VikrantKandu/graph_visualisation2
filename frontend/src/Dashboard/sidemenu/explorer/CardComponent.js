// import React, { useState } from 'react';
// import { Box, List, ListItem, ListItemText, Typography, Divider, ListItemIcon } from '@mui/material';
// import ComputerIcon from '@mui/icons-material/Computer';
// import StorageIcon from '@mui/icons-material/Storage';
// import CloudIcon from '@mui/icons-material/Cloud';
// import DataObjectIcon from '@mui/icons-material/DataObject';
// import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
// import StarIcon from '@mui/icons-material/Star'; // Popular category icon
// import '../../Style_css/CardComponent.css';

// // Sample resource data
// const resources = [
//   { category: 'Compute', name: 'Virtual Machine', details: 'A Virtual Machine is a software emulation of a physical computer.' },
//   { category: 'Compute', name: 'Virtual Machine Image', details: 'An image used to boot up Virtual Machines.' },
//   { category: 'Compute', name: 'Container', details: 'A lightweight package of software that includes everything needed to run it.' },
//   { category: 'Data', name: 'Bucket', details: 'A bucket is used to store objects in a cloud platform.' },
//   { category: 'AI', name: 'AI Dataset', details: 'A dataset used for machine learning and AI training.' },
//   // Add more resource objects here
// ];

// // Full category list, including categories without resources
// const categories = [
//   { name: 'Popular', icon: <StarIcon /> }, // Popular category
//   { name: 'Compute', icon: <ComputerIcon /> },
//   { name: 'Data', icon: <DataObjectIcon /> },
//   { name: 'AI', icon: <CloudIcon /> },
//   { name: 'Networking', icon: <NetworkCheckIcon /> },   // No resources in 'Networking'
//   { name: 'Storage', icon: <StorageIcon /> }           // No resources in 'Storage'
// ];

// function CardComponent() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedResource, setSelectedResource] = useState(null);

//   const handleCategoryClick = (category) => {
//     if (category.name === 'Popular') {
//       setSelectedCategory('Popular');
//     } else {
//       setSelectedCategory(category.name);  // Show resources for the selected category
//     }
//     setSelectedResource(null);  // Reset resource selection when switching category
//   };

//   const handleResourceClick = (resource) => {
//     setSelectedResource(resource);  // Show resource details
//   };

//   // Show all resources if "Popular" is selected, otherwise filter by selected category
//   const filteredResources = selectedCategory === 'Popular' ? resources : resources.filter(resource => resource.category === selectedCategory);

//   return (
//     <Box className="three-column-layout">
//       {/* First column - Categories */}
//       <Box className="column">
//         <Typography variant="h6">Categories</Typography>
//         <List>
//           {categories.map((category, index) => (
//             <ListItem button key={index} onClick={() => handleCategoryClick(category)}>
//               <ListItemIcon>
//                 {category.icon}
//               </ListItemIcon>
//               <ListItemText primary={category.name} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Second column - Subcategories (Resources) */}
//       <Box className="column">
//         <Typography variant="h6">Resources</Typography>
//         {selectedCategory ? (
//           filteredResources.length > 0 ? (
//             <List>
//               {filteredResources.map((resource, index) => (
//                 <ListItem button key={index} onClick={() => handleResourceClick(resource)}>
//                   <ListItemText primary={resource.name} />
//                 </ListItem>
//               ))}
//             </List>
//           ) : (
//             <Typography variant="body1">No resources available for this category</Typography>
//           )
//         ) : (
//           <Typography variant="body1">Select a category to view resources</Typography>
//         )}
//       </Box>

//       {/* Third column - Resource details */}
//       <Box className="column">
//         <Typography variant="h6">Details</Typography>
//         {selectedResource ? (
//           <Box>
//             <Typography variant="h4">{selectedResource.name}</Typography>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="body1">{selectedResource.details}</Typography>
//           </Box>
//         ) : (
//           <Typography variant="body1">Select a resource to see details</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }

// // export default CardComponent;
// import React, { useState } from 'react';
// import { Box, List, ListItem, ListItemText, Typography, Divider, ListItemIcon,Button } from '@mui/material';
// import { resources } from '../data/resources'; // Adjust the path if necessary
// import { categories } from '../data/categories'; // Adjust the path if necessary
// import '../../Style_css/CardComponent.css';

// function CardComponent() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedResource, setSelectedResource] = useState(null);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category.name);
//     setSelectedResource(null);
//   };

//   const handleResourceClick = (resource) => {
//     setSelectedResource(resource);
//   };

//   // Group resources by category
//   const groupedResources = resources.reduce((acc, resource) => {
//     acc[resource.category] = acc[resource.category] || [];
//     acc[resource.category].push(resource);
//     return acc;
//   }, {});

//   return (
//     <Box className="three-column-layout">
//       {/* First column - Categories */}
//       <Box className="column">
//         <Typography variant="h6">Categories</Typography>
//         <List>
//           {categories.map((category, index) => (
//             <ListItem button key={index} onClick={() => handleCategoryClick(category)}>
//               <ListItemIcon>{category.icon}</ListItemIcon>
//               <ListItemText primary={category.name} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Second column - Resources */}
//       <Box className="column">
//         <Typography variant="h6">Resources</Typography>
//         {selectedCategory ? (
//           selectedCategory === 'Popular' ? (  // Check if the selected category is 'Popular'
//             <>
//               {Object.keys(groupedResources).map((category, index) => (
//                 <Box key={index}>
//                   <Typography variant="h6">{category}</Typography>
//                   <List>
//                     {groupedResources[category].map((resource, resourceIndex) => (
//                       <ListItem button key={resourceIndex} onClick={() => handleResourceClick(resource)}>
//                         <ListItemIcon>{resource.icon}</ListItemIcon>
//                         <ListItemText primary={resource.name} />
//                       </ListItem>
//                     ))}
//                   </List>
//                   <Divider sx={{ my: 2 }} />
//                 </Box>
//               ))}
//             </>
//           ) : (
//             // Show only the resources of the selected category
//             <>
//               <Typography variant="h6">{selectedCategory}</Typography>
//               <List>
//                 {groupedResources[selectedCategory]?.map((resource, resourceIndex) => (
//                   <ListItem button key={resourceIndex} onClick={() => handleResourceClick(resource)}>
//                     <ListItemIcon>{resource.icon}</ListItemIcon>
//                     <ListItemText primary={resource.name} />
//                   </ListItem>
//                 ))}
//               </List>
//               <Divider sx={{ my: 2 }} />
//             </>
//           )
//         ) : (
//           <Typography variant="body1">Select a category to view resources</Typography>
//         )}
//       </Box>

//       {/* Third column - Resource details */}
//       <Box className="column">
//         <Typography variant="h6">Details</Typography>
//         {selectedResource ? (
//            <Box>
//            <Box display="flex" alignItems="center">
//              <ListItemIcon>{selectedResource.icon}</ListItemIcon> {/* Display resource icon */}
//              <Typography variant="contained" sx={{ marginLeft: 1 }}>
//                {selectedResource.category} {/* Button showing the resource type */}
//              </Typography>
//            </Box>
//            <Divider sx={{ my: 2 }} />
//            <Typography variant="body1">{selectedResource.details}</Typography> {/* Resource details below */}
//          </Box>
//         ) : (
//           <Typography variant="body1">Select a resource to see details</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default CardComponent;

import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider, ListItemIcon, TextField,InputAdornment } from '@mui/material';
import { resources } from '../data/resources'; // Adjust the path if necessary
import { categories } from '../data/categories'; // Adjust the path if necessary
import '../../Style_css/CardComponent.css';
import SearchIcon from '@mui/icons-material/Search'; // Import the Search icon

function CardComponent() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSelectedResource(null);
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    acc[resource.category] = acc[resource.category] || [];
    acc[resource.category].push(resource);
    return acc;
  }, {});

  // Filter categories based on the search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter resources based on the search term
  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="layout">
      {/* Search Box at the Top */}
      <Box className="search-box">
      <TextField
        variant="outlined"
        placeholder="Search categories and resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon /> {/* Add the Search icon here */}
            </InputAdornment>
          ),
        }}
      />
    </Box>

      {/* Three-column layout */}
      <Box className="three-column-layout">
        {/* First column - Categories */}
        <Box className="column">
          <Typography variant="h6">Categories</Typography>
          <List>
            {filteredCategories.map((category, index) => (
              <ListItem button key={index} onClick={() => handleCategoryClick(category)}>
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Second column - Resources */}
        <Box className="column">
          <Typography variant="h6">Resources</Typography>
          {selectedCategory ? (
            <>
              <Typography variant="h6">{selectedCategory}</Typography>
              <List>
                {selectedCategory === 'Popular' ? ( // Show all resources if 'Popular' is selected
                  filteredResources.map((resource, resourceIndex) => (
                    <ListItem button key={resourceIndex} onClick={() => handleResourceClick(resource)}>
                      <ListItemIcon>{resource.icon}</ListItemIcon>
                      <ListItemText primary={resource.name} />
                    </ListItem>
                  ))
                ) : (
                  filteredResources.filter(resource => resource.category === selectedCategory).map((resource, resourceIndex) => (
                    <ListItem button key={resourceIndex} onClick={() => handleResourceClick(resource)}>
                      <ListItemIcon>{resource.icon}</ListItemIcon>
                      <ListItemText primary={resource.name} />
                    </ListItem>
                  ))
                )}
              </List>
              <Divider sx={{ my: 2 }} />
            </>
          ) : (
            <Typography variant="body1">Select a category to view resources</Typography>
          )}
        </Box>

        {/* Third column - Resource details */}
        <Box className="column">
          <Typography variant="h6">Details</Typography>
          {selectedResource ? (
            <Box>
              <Box display="flex" alignItems="center">
                <ListItemIcon>{selectedResource.icon}</ListItemIcon>
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  {selectedResource.category} {/* Show resource type */}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{selectedResource.details}</Typography> {/* Resource details below */}
            </Box>
          ) : (
            <Typography variant="body1">Select a resource to see details</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CardComponent;
