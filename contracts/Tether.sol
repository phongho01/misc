// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.16;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

struct CourseInfo {
    address creator;
    uint256 courseId;
    uint256 budget;
    uint256 budgetAvailable;
    uint256 reward;
    string title;
    uint256 timeCreated;
}

contract Tether is ERC20 {
    event CreatedCourse(uint256 courseId, string title, uint256 budget, uint256 reward);
    event RewardedToStudent(uint256 courseId, address student);
    event RewardedToManyStudent(uint256 courseId, address[] students);
    event AddedBudget(uint256 courseId, uint256 amount);
    event WithdrawnBudgetCourse(uint256 courseId);

    using Counters for Counters.Counter;

    Counters.Counter public courseIds;

    mapping(uint256 => CourseInfo) public courseInfos;

    constructor() ERC20("Tether", "USDT") {}

    function mint(address _to, uint256 _amount) external {
        _mint(_to, _amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function createCourse(string memory _title, uint256 _budget, uint256 _reward) external {
        courseIds.increment();
        courseInfos[courseIds.current()] = CourseInfo({
            creator: _msgSender(),
            courseId: courseIds.current(),
            budget: _budget,
            budgetAvailable: _budget,
            reward: _reward,
            title: _title,
            timeCreated: block.timestamp
        });

        transfer(address(this), _budget);

        emit CreatedCourse(courseIds.current(), _title, _budget, _reward);
    }

    function addBudget(uint256 _courseId, uint256 _amount) external {
        require(courseInfos[_courseId].creator == _msgSender(), "Caller is not course's creator");
        courseInfos[_courseId].budget += _amount;
        courseInfos[_courseId].budgetAvailable += _amount;

        transfer(address(this), _amount);

        emit AddedBudget(_courseId, _amount);
    }

    function rewardToStudent(uint256 _courseId, address _student) external {
        require(courseInfos[_courseId].creator == _msgSender(), "Caller is not course's creator");
        CourseInfo storage course = courseInfos[_courseId];
        require(course.budgetAvailable >= course.reward, "Budget is not enough");
        course.budgetAvailable -= course.reward;
        ERC20(address(this)).transfer(_student, course.reward);

        emit RewardedToStudent(_courseId, _student);
    }

    function rewardToManyStudent(uint256 _courseId, address[] memory _students) external {
        require(courseInfos[_courseId].creator == _msgSender(), "Caller is not course's creator");
        CourseInfo storage course = courseInfos[_courseId];
        for (uint256 i = 0; i < _students.length; i++) {
            require(course.budgetAvailable >= course.reward, "Budget is not enough");
            course.budgetAvailable -= course.reward;
            ERC20(address(this)).transfer(_students[i], course.reward);
        }

        emit RewardedToManyStudent(_courseId, _students);
    }

    function withdrawBudgetCourse(uint256 _courseId, uint256 _amount) external {
        require(courseInfos[_courseId].creator == _msgSender(), "Caller is not course's creator");
        require(courseInfos[_courseId].budgetAvailable >= _amount, "Not enough balance");
        ERC20(address(this)).transfer(_msgSender(), _amount);
        courseInfos[_courseId].budgetAvailable -= _amount;

        emit WithdrawnBudgetCourse(_courseId);
    }
}
