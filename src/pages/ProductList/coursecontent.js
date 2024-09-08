import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import main_axios from '../../utilities/mainaxios';

const CourseContentForm = () => {
  const [weekNumber, setWeekNumber] = useState('');
  const [courseId, setCourseId] = useState('');
  const [days, setDays] = useState([
    { day: 'Monday', topics: [{ title: '', description: '' }] },
    { day: 'Tuesday', topics: [{ title: '', description: '' }] },
    { day: 'Wednesday', topics: [{ title: '', description: '' }] },
    { day: 'Thursday', topics: [{ title: '', description: '' }] },
    { day: 'Friday', topics: [{ title: '', description: '' }] }
  ]);

  const handleTopicChange = (dayIndex, topicIndex, key, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].topics[topicIndex][key] = value;
    setDays(updatedDays);
  };

  const handleAddTopic = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].topics.push({ title: '', description: '' });
    setDays(updatedDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseContent = {
      weekNumber,
      courseId,
      days,
    };

    try {
      const response = await main_axios.post('/coursecontent/', courseContent);
      console.log('Course content posted successfully:', response.data);
      // Handle success, maybe clear form or show a success message
    } catch (error) {
      console.error('Error posting course content:', error);
      // Handle error, maybe show an error message
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Course Content Form
        </Typography>

        <Box mb={2}>
          <TextField
            label="Week Number"
            type="number"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
            fullWidth
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Course ID"
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            fullWidth
            required
          />
        </Box>

        {days.map((day, dayIndex) => (
          <Box key={dayIndex} mb={3}>
            <Typography variant="h6">{day.day}</Typography>
            {day.topics.map((topic, topicIndex) => (
              <Grid container spacing={2} key={topicIndex}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Title"
                    type="text"
                    value={topic.title}
                    onChange={(e) =>
                      handleTopicChange(dayIndex, topicIndex, 'title', e.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Description"
                    type="text"
                    multiline
                    minRows={3}
                    value={topic.description}
                    onChange={(e) =>
                      handleTopicChange(dayIndex, topicIndex, 'description', e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
            <Box mt={1}>
              <IconButton
                color="primary"
                onClick={() => handleAddTopic(dayIndex)}
              >
                <AddIcon /> <Typography variant="body2">Add Topic</Typography>
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default CourseContentForm;
