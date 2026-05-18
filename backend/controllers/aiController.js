const axios = require('axios');
const Employee = require('../models/Employee');

// @desc    Get AI Recommendation for Employee
// @route   POST /api/ai/recommend
// @access  Private
const getAIRecommendation = async (req, res, next) => {
    try {
        const { employeeId } = req.body;

        if (!employeeId) {
            res.status(400);
            throw new Error('Employee ID is required');
        }

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            res.status(404);
            throw new Error('Employee not found');
        }

        const prompt = `Analyze the following employee's performance and provide recommendations:
        Name: ${employee.name}
        Department: ${employee.department}
        Skills: ${employee.skills.join(', ')}
        Performance Score: ${employee.performanceScore}/100
        Experience: ${employee.experience} years

        Provide a structured feedback covering:
        1. Promotion Recommendation (Yes/No with reason)
        2. Employee Ranking Category (e.g., Top Performer, Needs Improvement)
        3. Training Suggestions
        4. Skill Enhancement Recommendation
        5. AI Feedback Generation`;

        // Assuming OpenRouter or OpenAI
        const apiKey = process.env.OPENAI_API_KEY;
        const apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // You can change to OpenAI URL if needed

        const aiResponse = await axios.post(apiUrl, {
            model: "google/gemini-2.5-pro", // Changed to Gemini 2.5 Pro via OpenRouter
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'http://localhost:5000', // Required by OpenRouter
                'X-Title': 'Employee Performance System' // Required by OpenRouter
            }
        });

        const recommendation = aiResponse.data.choices[0].message.content;

        res.status(200).json({ recommendation });
    } catch (error) {
        console.error(error.message);
        res.status(500);
        next(new Error('AI API Error: ' + (error.response?.data?.error?.message || error.message)));
    }
};

module.exports = {
    getAIRecommendation
};
