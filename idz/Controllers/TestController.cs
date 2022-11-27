using AutoMapper;
using idz.DL;
using idz.DL.Models;
using idz.Dtos.Test;
using idz.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace idz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        private readonly IEmailService emailService;

        public TestController(DataContext context, IMapper mapper, IEmailService emailService)
        {
            this.context = context;
            this.mapper = mapper;
            this.emailService = emailService;
        }

        [HttpPost("create/{tabId}")]
        public async Task<IActionResult> CreateTest(int tabId, [FromBody] TestInputDto newTest)
        {

            var tab = await context.Tabs.FirstOrDefaultAsync(x => x.Id == tabId);

            if (tab == null)
            {
                return NotFound(new { Message = "no tab is found" });
            }

            var testToAdd = await AddTestToDb(newTest);
            await AddTestToTab(tab, testToAdd);

            var response = mapper.Map<TestInputDto>(testToAdd);

            return Ok(response);
        }

        [HttpDelete("{testId}")]
        public async Task<IActionResult> DeleteTest(int testId)
        {
            var test = await context.Tests.FirstOrDefaultAsync(x => x.Id == testId);
            if (test == null)
            {
                return NotFound(new { Message = "no tab is found" });
            }

            context.Remove(test);
            await context.SaveChangesAsync();
            return Ok(testId);
        }

        [HttpPut("update/{testId}")]
        public async Task<IActionResult> UpdateTest(int testId, [FromBody] TestInputDto newTest)
        {
            var test = await context.Tests.FirstOrDefaultAsync(t => t.Id == testId);

            mapper.Map(newTest, test);
            context.Update(test);
            await context.SaveChangesAsync();

            var response = mapper.Map<TestInputDto>(test);

            return Ok(response);
        }

        [HttpPost("proccessAnswers")]
        public async Task<IActionResult> ProcessTestAnswers([FromBody] AnswerListDto testAnswers)
        {
            int userId = int.Parse(User.Claims.Where(x => x.Type.Equals("UserId")).First().Value);

            var test = await context.Tests.FirstOrDefaultAsync(t => t.Id == testAnswers.TestId);

            if (test == null)
            {
                throw new System.Exception("Test is not found");
            }

            if (testAnswers.Answears.Count != test.Questions.Count)
            {
                throw new System.Exception("Take test again please");
            }
            int wrongCount = 0;
            for (int i = 0; i < testAnswers.Answears.Count; i++)
            {
                var trueAnswer = test.Questions.Where(q => q.Id == testAnswers.Answears[i].QuestionId).FirstOrDefault();
                if (trueAnswer == null)
                {
                    throw new System.Exception("Take test again please");
                }

                var realAnswers = trueAnswer.AnswearsList.ToLower().Split('|');
                var inputAnswers = testAnswers.Answears[i].Answear.ToLower().Split('|');
                Array.Sort(realAnswers);
                Array.Sort(inputAnswers);

                if (!realAnswers.SequenceEqual(inputAnswers))
                {
                    wrongCount++;
                }
            }

            double passThreshold = test.LowThreshold;
            double currentThreshold = ((double)(testAnswers.Answears.Count - wrongCount) / (double)testAnswers.Answears.Count) * 100d;
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            string bodyToSend = testAnswers.Name + " " + testAnswers.Surname +
                    $"({user.Name} {user.Surname}) passed test {test.Name} with {currentThreshold}% result " +
                    $"(minimal result is {passThreshold}%);";

            await emailService.SendEmailAsync(new Dtos.Mail.MailRequest()
            {
                ToEmail = "teacher@gmail.com",
                Body = "<p>" + bodyToSend + "</p>",
                Subject = $"Test results for {test.Name}"
            });

            if (currentThreshold < passThreshold)
            {   
                return BadRequest(new { Message = "Test is not passed" });
            }
            
           
            user.UserTestResults.Add(new UserTestResult()
            {
                Result = currentThreshold.ToString(),
                Test = test,
                TestTime = DateTime.UtcNow
            });

            context.Update(user);
            await context.SaveChangesAsync();

            return Ok(new { Message = "Test is passed" });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllTest(int page, int pageSize) 
        {
            if (page <= 0) { 
                page = 1;
            }

            if (pageSize <= 0) {
                pageSize = 10;
            }
            var testsToReturn = await context.Tests.Skip(page - 1).Take(pageSize).Select(x => new { 
                Name = x.Name,
                TestId = x.Id,
                TabName = x.Tab.Name,
                TabId = x.Tab.Id,
                Threshold = x.LowThreshold
            }).ToListAsync();

            return Ok(testsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTestById(int id) 
        {
            var testToReturn = await context.Tests.FirstOrDefaultAsync(t => t.Id == id);
            var testOutput = mapper.Map<TestOutputDto>(testToReturn);
            return Ok(testOutput);
        }

        private async Task<Test> AddTestToDb(TestInputDto newTestInfo)
        {
            var testToAdd = mapper.Map<Test>(newTestInfo);
            await context.AddAsync(testToAdd);
            await context.SaveChangesAsync();

            return testToAdd;
        }

        private async Task AddTestToTab(Tab tab, Test testToAdd)
        {
            tab.Tests.Add(testToAdd);
            context.Update(tab);
            await context.SaveChangesAsync();
        }

    }
}
