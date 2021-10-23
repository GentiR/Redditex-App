using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Application.Models;
using System.Threading;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //injecting IMediatR in Controller
        // private readonly IMediator _mediator;
        // public ActivitiesController(IMediator mediator)
        // {
        //     _mediator = mediator;
        // }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivites()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            try{
             Ok(await Mediator.Send(new Create.Command {Activity = activity}));
            
            }catch(Exception ex){
                return new JsonResult(ex.Message);
            }
            return new JsonResult("Activity Created");

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            try{
                activity.Id = id;
                Ok(await Mediator.Send(new Edit.Command{Activity =activity}));

            }catch(Exception ex){
                return new JsonResult(ex.Message);
            }
            return new JsonResult("Activity Updated");
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            try{
                Ok(await Mediator.Send(new Delete.Command{Id = id}));
            
            }catch(Exception ex){
                return new JsonResult(ex.Message);
            }
            return new JsonResult("Activity Deleted");
        }
    }
}