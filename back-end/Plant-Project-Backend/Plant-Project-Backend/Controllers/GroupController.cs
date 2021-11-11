﻿using DBContext;
using Logic;
using Microsoft.AspNetCore.Mvc;
using Plant_Project_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Plant_Project_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : ControllerBase
    {
        User user;
        public GroupController()
        {
            user = new Logic.User();
        }

        [HttpGet]
        public List<Group> GetGroups(int userId)
        {
            PlantDBContext context = new PlantDBContext(new Microsoft.EntityFrameworkCore.DbContextOptions<PlantDBContext>());
            var groups = new List<Group>();
            groups.Add(new Group() { Name = "group 1", Password = "123", Id = 1 });
            groups.Add(new Group() { Name = "group 2", Password = "123", Id = 2 });
            groups.Add(new Group() { Name = "group 3", Password = "123", Id = 3 });
            groups.Add(new Group() { Name = "group 4", Password = "123", Id = 27 });
            try
            {
                context.AddRange(groups);
                context.SaveChanges();
                return groups;
            }
            catch
            {
            return new List<Group>();
            }
        }

        [HttpPost]
        [Route("new")]
        public int CreateGroup(string name, string password)
        {
            PlantDBContext context = new PlantDBContext(new Microsoft.EntityFrameworkCore.DbContextOptions<PlantDBContext>());

            Group group = new Group() { Name = name, Password = password };

            context.Add(group);
            context.SaveChanges();

            return 200;
        }
    }
}
