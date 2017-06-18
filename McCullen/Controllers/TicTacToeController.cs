﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace McCullen.Controllers
{
    [Route("api/[controller]")]
    public class TicTacToeController : Controller
    {
        public class MoveValue
        {
            public int Row { get; set; }
            public int Column { get; set; }
            public int State { get; set; }
            public int Depth { get; set; }
        }
        [HttpPost("[action]")]
        public Dictionary<string, List<MoveValue>> GetBoardToMoves(int rows, int columns)
        {
            return null;
        }
        [HttpPost("[action]")]
        public void SerializeBoardToMoves([FromBody] Dictionary<string, List<MoveValue>> boardToMoves)
        {
            string json = JsonConvert.SerializeObject(boardToMoves);
            System.IO.File.WriteAllText(@"C:\Users\jeff\Desktop\test.txt", json);
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
